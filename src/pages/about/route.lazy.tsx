import { lazyRouteComponent } from '@tanstack/react-router';
import { lazy } from 'react';

export const Route = lazyRouteComponent(async () =>
  lazy(() => import('./route.lazy'))
);

export default function AboutPage() {
  return (
    <main>
      <h3>About</h3>
    </main>
  );
}
