import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getOneTask, updateTask } from 'api/tasks';
import dayjs from 'dayjs';
import { FormTask } from 'features/formTask/FormTask';
import { useMemo, useRef } from 'react';
import { DISPLAY_DATA_FORMAT } from 'shared/constants/constants';
import { Button, Dialog } from 'shared/ui';
import { TTask } from 'types/task';

import styles from './Task.module.css';

export function Task() {
  const { taskId } = useParams({ strict: false });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const { data: task, isPending } = useQuery({
    queryFn: ({ signal }) => getOneTask(signal, taskId),
    queryKey: ['task', { taskId }],
    staleTime: Infinity,
  });

  const { mutateAsync: updateOneTask } = useMutation({
    mutationFn: (task: TTask) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },
  });

  const cachedDatetime = useMemo(() => dayjs(task?.datetime), [task?.datetime]);
  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (!task) {
    return <h1>There is no such task</h1>;
  }

  return (
    <section className={styles.task}>
      <div className={styles.wrapper}>
        <h1 className={styles.text}>{task.text}</h1>
        <p>{task.id}</p>
        <p>{cachedDatetime.format(DISPLAY_DATA_FORMAT)}</p>
      </div>
      <Button
        className={styles.btn_edit}
        onClick={() => dialogRef.current?.show()}
      >
        edit
      </Button>
      <Dialog className={styles.dialog} ref={dialogRef}>
        <FormTask
          btnConfirmText="Save"
          btnCancelText="Cancel"
          taskCurrent={task}
          actionCancel={() => {
            dialogRef.current?.close();
            queryClient.cancelQueries({ queryKey: ['tasks'] });
          }}
          actionConfirm={async (text?: string, datetime?: string) => {
            if (datetime && text) {
              await updateOneTask({ datetime, id: taskId, text });
            }
            dialogRef.current?.close();
          }}
        />
      </Dialog>
    </section>
  );
}
