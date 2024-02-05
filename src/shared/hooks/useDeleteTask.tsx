import { QueryClient, useMutation } from '@tanstack/react-query';
import { deleteTask } from 'api/tasks';
import { TTaskId } from 'types/task';

export const useDeleteTask = (queryClient: QueryClient) => {
  const { mutateAsync: deleteOneTask } = useMutation({
    mutationFn: (id: TTaskId) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { deleteOneTask };
};
