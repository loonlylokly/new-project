import { useQuery } from '@tanstack/react-query';
import { getTasks } from 'api/tasks';
import { ItemTask } from 'entities/itemTask/ItemTask';
import { List } from 'shared/ui';
import { TTask } from 'types/task';

import styles from './TasksList.module.css';

export function TasksList() {
  const { data: tasks, isPending } = useQuery({
    queryFn: ({ signal }) => getTasks(signal),
    queryKey: ['tasks'],
    staleTime: Infinity,
  });

  return (
    <section className={styles.tasks_list}>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <List
          listNode="ul"
          className={styles.list}
          items={tasks || []}
          renderItem={(task: TTask) => <ItemTask key={task.id} task={task} />}
        />
      )}
    </section>
  );
}
