import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotFoundRoute, Router, RouterProvider } from '@tanstack/react-router';
import { Route as rootRoute } from 'pages/__root';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const notFoundRoute = new NotFoundRoute({
  component: () => '404 Not Found',
  getParentRoute: () => rootRoute,
});

// Set up a Router instance
const router = new Router({
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
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
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
