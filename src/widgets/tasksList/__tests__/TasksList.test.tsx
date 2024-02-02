import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { useDeleteTask } from 'shared/hooks/useDeleteTask';
import { useFetchTasks } from 'shared/hooks/useFetchTasks';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TasksList } from 'widgets/tasksList/TasksList';

vi.mock('shared/hooks/useFetchTasks', () => ({
  useFetchTasks: vi.fn(),
}));

vi.mock('shared/hooks/useDeleteTask', () => ({
  useDeleteTask: vi.fn(),
}));

describe('Tasks List', () => {
  afterEach(() => {
    vi.mocked(useFetchTasks).mockReset();
  });

  it('should render Loading before fetch', () => {
    vi.mocked(useFetchTasks).mockImplementation(() => ({
      isError: false,
      isPending: true,
      tasks: [],
    }));

    render(<TasksList />);
    expect(useFetchTasks).toBeCalledWith('');
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should render Error', () => {
    vi.mocked(useFetchTasks).mockImplementation(() => ({
      isError: true,
      isPending: false,
      tasks: [],
    }));

    render(<TasksList />);
    expect(screen.getByText('Error!!!')).toBeTruthy();
  });

  it('should render tasks', async () => {
    const router = createTestRouter(TasksList);
    vi.mocked(useFetchTasks).mockImplementation(() => ({
      isError: false,
      isPending: false,
      tasks: [
        {
          datetime: '',
          id: 1,
          text: 'Task 1',
        },
      ],
    }));

    let deleteTask: UseMutateAsyncFunction<void, Error, number, unknown>;
    vi.mocked(useDeleteTask).mockImplementation(() => ({
      deleteOneTask: deleteTask,
    }));

    renderComponent(router);
    await waitFor(() => expect(screen.getByText('Task 1')).toBeTruthy());
  });
});
