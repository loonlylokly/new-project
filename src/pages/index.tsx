import { FileRoute } from '@tanstack/react-router';
import SearchForm from 'widgets/searchForm/SearchForm';
import { TasksList } from 'widgets/tasksList/TasksList';

export const Route = new FileRoute('/').createRoute({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <SearchForm />
      <TasksList />
    </main>
  );
}
