import { NotFoundRoute, Router, RouterProvider } from '@tanstack/react-router';
import { Route as rootRoute } from 'pages/__root';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

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
