import { FileRoute } from '@tanstack/react-router';
import { AddTask } from 'widgets/addTask/AddTask';
import { TasksList } from 'widgets/tasksList/TasksList';

export const Route = new FileRoute('/').createRoute({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <TasksList />
      <AddTask />
    </main>
  );
}
