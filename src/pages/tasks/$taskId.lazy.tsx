import { lazyRouteComponent } from '@tanstack/react-router';
import { lazy } from 'react';
import { Task } from 'widgets/task/Task';

export const Route = lazyRouteComponent(async () =>
  lazy(() => import('./$taskId.lazy'))
);

export default function TaskPage() {
  return (
    <main>
      <Task />
    </main>
  );
}
