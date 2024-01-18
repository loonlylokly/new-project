import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/tasks/$taskId').createRoute({
  component: TaskPage,
});

function TaskPage() {
  return (
    <div>
      <h3>Welcome Task Page!</h3>
    </div>
  );
}