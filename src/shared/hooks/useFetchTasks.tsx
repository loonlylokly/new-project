import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTasks } from 'api/tasks';

export const useFetchTasks = (search: string) => {
  const {
    data: tasks,
    isError,
    isPending,
  } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getTasks(signal, search),
    queryKey: ['tasks', { search }],
    staleTime: Infinity,
  });

  return { isError, isPending, tasks };
};
