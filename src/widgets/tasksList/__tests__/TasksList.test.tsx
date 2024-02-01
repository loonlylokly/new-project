import { render, screen } from '@testing-library/react';
import { useFetchTasks } from 'shared/hocks/useFetchTasks';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TasksList } from 'widgets/tasksList/TasksList';

vi.mock('shared/hocks/useFetchTasks', () => ({
  useFetchTasks: vi.fn(),
}));

describe('Tasks List', () => {
  afterEach(() => {
    vi.mocked(useFetchTasks).mockReset();
  });

  it('should render Loading before fetch', () => {
    vi.mocked(useFetchTasks).mockImplementation(() => ({
      isPending: true,
      tasks: [],
    }));
    render(<TasksList />);
    expect(useFetchTasks).toBeCalledWith('');
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  // it.todo('should render Loading before fetch', () => {
  //   // const { result } = renderHook(() => useCustomHook(), { wrapper });
  //   // await waitFor(() => expect(result.current.isSuccess).toBe(true));
  // });
});
