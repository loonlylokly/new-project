/* eslint-disable @typescript-eslint/no-unused-vars */
import { TTask } from 'types/task';
import { describe, expect, it, vi } from 'vitest';

const tasksListResponse: TTask[] = [
  {
    datetime: '',
    id: 1,
    text: 'Task 1',
  },
  {
    datetime: '',
    id: 2,
    text: 'Task 2',
  },
  {
    datetime: '',
    id: 3,
    text: 'Task 3',
  },
];

function createFetchResponse(data: unknown) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('Task Api', () => {
  it('should get all tasks', async () => {
    const fetchGetTasks = vi.fn(
      async (_search, _signal) =>
        await createFetchResponse(tasksListResponse).json()
    );
    const controller = new AbortController();
    const signal = controller.signal;
    const tasksList = await fetchGetTasks('', signal);
    expect(fetchGetTasks).toHaveReturnedWith(tasksListResponse);
    expect(fetchGetTasks).toHaveBeenCalledWith('', signal);
    expect(tasksList).toStrictEqual(tasksListResponse);
  });
});
