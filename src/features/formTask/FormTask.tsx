import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FieldsFormTask } from 'features/fieldsFormTask/FieldsFormTask';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DEFAULT_DATA_FORMAT } from 'shared/constants/constants';
import { Button } from 'shared/ui';
import { TFormTask, TTask } from 'types/task';
import { z } from 'zod';

import styles from './FormTask.module.css';

const formTaskSchema = z.object({
  datetime: z.string().min(16, 'Wrong date').max(16).trim(),
  text: z.string().min(3).max(120),
});

type FormFields = z.infer<typeof formTaskSchema>;

type Props = {
  taskCurrent?: TTask;
  btnCancelText?: string;
  actionCancel?: () => void;
  btnConfirmText?: string;
  actionConfirm?: (text?: string, datetime?: string) => void;
};

export function FormTask({
  actionCancel = () => {},
  actionConfirm = () => {},
  btnCancelText = 'Cancel',
  btnConfirmText = 'Save',
  taskCurrent = {
    datetime: '',
    id: '',
    text: '',
  },
}: Props) {
  const cachedDatetime = useMemo(
    () => dayjs(taskCurrent.datetime).format(DEFAULT_DATA_FORMAT),
    [taskCurrent.datetime]
  );

  const {
    formState: { errors, isSubmitting },
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

  const onSubmit: SubmitHandler<TFormTask> = async (data) => {
    try {
      actionConfirm(data.text, data.datetime);
      reset();
    } catch (error) {
      setError('root', {
        message: "Can't submit the form",
      });
      console.log(error, 'errors');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FieldsFormTask registore={register} errors={errors} />
      <div className={styles.btnWrapper}>
        <Button
          className={styles.btnCancel}
          disabled={isSubmitting}
          onClick={() => {
            reset();
            actionCancel();
          }}
          type="button"
        >
          {btnCancelText}
        </Button>
        <Button className={styles.btnConfirm} disabled={isSubmitting}>
          {btnConfirmText}
        </Button>
      </div>
    </form>
  );
}
