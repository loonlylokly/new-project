import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import { render } from '@testing-library/react';

export function createTestRouter(component: () => JSX.Element) {
  const rootRoute = new RootRoute({
    component: Outlet,
  });

  const componentRoute = new Route({
    component,
    getParentRoute: () => rootRoute,
    path: '/',
  });

  const router = new Router({
    history: createMemoryHistory(),
    routeTree: rootRoute.addChildren([componentRoute]),
  });

  return router;
}

const _router = createTestRouter(() => <></>);

export function renderComponent(router: typeof _router) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
