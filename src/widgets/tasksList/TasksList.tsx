import { ItemTask } from 'entities/itemTask/ItemTask';
import { Button, List } from 'shared/ui';
import { TTask } from 'types/task';

import styles from './TasksList.module.css';

const TasksExample = [
  {
    datetime: '',
    id: '1',
    text: 'Test',
  },
  {
    datetime: '',
    id: '2',
    text: 'Test2',
  },
  {
    datetime: '',
    id: '3',
    text: 'Test3',
  },
];

export function TasksList() {
  return (
    <section className={styles.tasks_list}>
      <List
        listNode="ul"
        className={styles.list}
        items={TasksExample}
        renderItem={(task: TTask) => <ItemTask key={task.id} task={task} />}
      />
      <Button className={styles.btn_addtask}>Add Task</Button>
    </section>
  );
}
