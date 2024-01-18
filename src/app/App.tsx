import { NotFoundRoute, Router, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { Route as rootRoute } from '../pages/__root';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { routeTree } from '../routeTree.gen';

const notFoundRoute = new NotFoundRoute({
  component: () => '404 Not Found',
  getParentRoute: () => rootRoute,
});

// Set up a Router instance
const router = new Router({
  defaultPreload: 'intent',
  notFoundRoute,
  routeTree,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
