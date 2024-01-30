import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FieldsFormTask } from 'features/fieldsFormTask/FieldsFormTask';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  DEFAULT_DATA_FORMAT,
  TASK_VALIDATION as valid,
} from 'shared/constants/constants';
import { Button } from 'shared/ui';
import { Loading } from 'shared/ui/icons/loading/Loading';
import { TFormTask } from 'types/task';
import { z } from 'zod';

import styles from './FormTask.module.css';

const formTaskSchema = z.object({
  datetime: z
    .string()
    .min(valid.datetime.min.value, valid.datetime.min.message)
    .max(valid.datetime.max.value)
    .trim(),
  text: z.string().min(valid.text.min.value).max(valid.text.max.value),
});

type FormFields = z.infer<typeof formTaskSchema>;

type Props = {
  taskCurrent: TFormTask;
  btnCancelText?: string;
  actionCancel?: () => void;
  btnConfirmText?: string;
  actionConfirm?: (task?: TFormTask) => void;
};

export function FormTask({
  actionCancel = () => {},
  actionConfirm = () => {},
  btnCancelText = 'Cancel',
  btnConfirmText = 'Save',
  taskCurrent,
}: Props) {
  const cachedDatetime = useMemo(
    () => dayjs(taskCurrent.datetime).format(DEFAULT_DATA_FORMAT),
    [taskCurrent.datetime]
  );
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      datetime: cachedDatetime,
      text: taskCurrent.text,
    },
    resolver: zodResolver(formTaskSchema),
  });

  useEffect(() => {
    reset({ datetime: cachedDatetime, text: taskCurrent.text });
  }, [taskCurrent, cachedDatetime, reset]);

  const onSubmit: SubmitHandler<TFormTask> = async (data) => {
    try {
      await actionConfirm({ datetime: data.datetime, text: data.text });
    } catch (error) {
      setError('root', {
        message: "Something Wrong. Can't submit the form",
      });
      console.log(error, 'errors');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FieldsFormTask registore={register} errors={errors} />
      <p className={styles.error}>{errors.root?.message}&nbsp;</p>
      <div className={styles.btnWrapper}>
        <Button
          className={styles.btnCancel}
          disabled={isSubmitting}
          onClick={() => {
            !isDirty && reset();
            actionCancel();
          }}
          type="button"
        >
          {btnCancelText}
        </Button>
        <Button
          className={styles.btnConfirm}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? <Loading /> : btnConfirmText}
        </Button>
      </div>
    </form>
  );
}
