import { ItemTask } from 'entities/itemTask/ItemTask';
import { SearchForm } from 'features/searchForm/SearchForm';
import { useState } from 'react';
import { useFetchTasks } from 'shared/hocks/useFetchTasks';
import { List } from 'shared/ui';
import { TTask } from 'types/task';

import styles from './TasksList.module.css';

export function TasksList() {
  const [search, setSearch] = useState<string>('');
  const { isPending, tasks } = useFetchTasks(search);

  return (
    <section className={styles.tasks_list}>
      <SearchForm setSearch={setSearch} />
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
