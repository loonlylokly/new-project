import { FileRoute } from '@tanstack/react-router';
import { Task } from 'widgets/task/Task';

export const Route = new FileRoute('/tasks/$taskId').createRoute({
  component: TaskPage,
});

function TaskPage() {
  return (
    <main>
      <Task />
    </main>
  );
}
