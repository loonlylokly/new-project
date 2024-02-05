import { ItemTask } from 'entities/itemTask/ItemTask';
import { SearchForm } from 'features/searchForm/SearchForm';
import { useState } from 'react';
import { useFetchTasks } from 'shared/hooks/useFetchTasks';
import { List } from 'shared/ui';
import { TTask } from 'types/task';

import styles from './TasksList.module.css';

export function TasksList() {
  const [search, setSearch] = useState<string>('');
  const { isError, isPending, tasks } = useFetchTasks(search);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h1>Error!!!</h1>;
  }

  return (
    <section className={styles.tasks_list}>
      <SearchForm setSearch={setSearch} />
      <List
        listNode="ul"
        className={styles.list}
        items={tasks || []}
        renderItem={(task: TTask) => <ItemTask key={task.id} task={task} />}
      />
    </section>
  );
}
