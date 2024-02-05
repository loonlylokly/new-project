import { lazyRouteComponent } from '@tanstack/react-router';
import { lazy } from 'react';
import { AddTask } from 'widgets/addTask/AddTask';
import { TasksList } from 'widgets/tasksList/TasksList';

export const Route = lazyRouteComponent(async () =>
  lazy(() => import('./index.lazy'))
);

export default function HomePage() {
  return (
    <main>
      <TasksList />
      <AddTask />
    </main>
  );
}
