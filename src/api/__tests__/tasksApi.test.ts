import {
  addTask,
  deleteTask,
  getOneTask,
  getTasks,
  updateTask,
} from 'api/tasks';
import { TTask } from 'types/task';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const tasksList: TTask[] = [
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
];

const mockFetch = vi.spyOn(global, 'fetch');
const controller = new AbortController();

function mockFetchResponse(status: number, data?: unknown) {
  const response = {
    json: () => new Promise((resolve) => resolve(data)),
    status: status,
  } as Response;
  return response;
}

describe('Task Api', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('should get tasks', async () => {
    const status = 200;
    const search = '';
    mockFetch.mockResolvedValue(mockFetchResponse(status, tasksList));

    expect(await getTasks(controller.signal, search)).toEqual(tasksList);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/tasks/?search=${search}`,
      {
        signal: controller.signal,
      }
    );
  });

  it('should get error instead of tasks', async () => {
    const errorMessage = 'Network Error';
    const search = '';
    mockFetch.mockRejectedValue(new Error(errorMessage));
    await expect(getTasks(controller.signal, search)).rejects.toThrow(
      errorMessage
    );
  });

  it('should get task by id', async () => {
    const status = 200;
    const id = 1;
    const task = tasksList.map((item) => item.id === id && item);
    mockFetch.mockResolvedValue(mockFetchResponse(status, task));

    expect(await getOneTask(controller.signal, id)).toEqual(task[0]);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`,
      {
        signal: controller.signal,
      }
    );
  });

  it('should get error instead of task by id', async () => {
    const errorMessage = 'Network Error';
    const id = 1;
    mockFetch.mockRejectedValue(new Error(errorMessage));

    await expect(getOneTask(controller.signal, id)).rejects.toThrow(
      errorMessage
    );
  });

  it('should add new task', async () => {
    const status = 200;
    mockFetch.mockResolvedValue(mockFetchResponse(status));

    await addTask(tasksList[0]);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/tasks`,
      {
        body: JSON.stringify(tasksList[0]),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
  });

  it('should get error instead of add task', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValue(new Error(errorMessage));
    await expect(addTask(tasksList[0])).rejects.toThrow(errorMessage);
  });

  it('should get tasks', async () => {
    const status = 200;
    mockFetch.mockResolvedValue(mockFetchResponse(status));

    await updateTask(tasksList[0]);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/tasks`,
      {
        body: JSON.stringify(tasksList[0]),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    );
  });

  it('should get error instead of update task', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValue(new Error(errorMessage));
    await expect(updateTask(tasksList[0])).rejects.toThrow(errorMessage);
  });

  it('should delete task', async () => {
    const status = 200;
    const id = 1;
    mockFetch.mockResolvedValue(mockFetchResponse(status));

    await deleteTask(id);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }
    );
  });

  it('should get error instead delete task by id', async () => {
    const errorMessage = 'Network Error';
    const id = 1;
    mockFetch.mockRejectedValue(new Error(errorMessage));

    await expect(deleteTask(id)).rejects.toThrow(errorMessage);
  });
});
