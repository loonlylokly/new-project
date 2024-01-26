import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { deleteTask } from 'api/tasks';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { DISPLAY_DATA_FORMAT } from 'shared/constants/constants';
import { Button } from 'shared/ui';
import { TTask, TTaskId } from 'types/task';

import styles from './ItemTask.module.css';

type Props = {
  task: TTask;
};

export function ItemTask({ task }: Props) {
  const cachedDate = useMemo(
    () => dayjs(task.datetime).format(DISPLAY_DATA_FORMAT),
    [task.datetime]
  );

  const queryClient = useQueryClient();

  const { mutateAsync: deleteOneTask } = useMutation({
    mutationFn: (id: TTaskId) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <li className={styles.task}>
      <Link
        className={styles.link}
        to={'/tasks/$taskId'}
        params={{
          taskId: task.id.toString(),
        }}
      >
        <span className={styles.text}>{task.id}</span>
        <p className={styles.text}>{task.text}</p>
        <span className={styles.text}>{cachedDate}</span>
      </Link>
      <Button
        className={styles.button}
        title="Remove Task"
        onClick={async () => {
          await deleteOneTask(task.id);
        }}
      >
        X
      </Button>
    </li>
  );
}
