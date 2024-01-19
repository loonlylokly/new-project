import { Route as rootRoute } from './../pages/__root';
import { Route as AboutRouteImport } from './../pages/about/route';
import { Route as IndexImport } from './../pages/index';
import { Route as TasksTaskIdImport } from './../pages/tasks/$taskId';

const AboutRouteRoute = AboutRouteImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const TasksTaskIdRoute = TasksTaskIdImport.update({
  path: '/tasks/$taskId',
  getParentRoute: () => rootRoute,
} as any);
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/about': {
      preLoaderRoute: typeof AboutRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/tasks/$taskId': {
      preLoaderRoute: typeof TasksTaskIdImport;
      parentRoute: typeof rootRoute;
    };
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRouteRoute,
  TasksTaskIdRoute,
]);
