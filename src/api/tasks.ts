import { TFormTask, TTask, TTaskId } from 'types/task';

export const getTasks = async (
  signal: AbortSignal,
  search: string
): Promise<TTask[]> => {
  const tasksResponse = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/tasks/?search=${search}`,
    {
      signal,
    }
  );
  const tasks = await tasksResponse.json();
  return tasks;
};

export const getOneTask = async (
  signal: AbortSignal,
  id: TTaskId
): Promise<TTask> => {
  const tasksResponse = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`,
    {
      signal,
    }
  );
  const task = await tasksResponse.json();
  return task[0];
};

export const addTask = async (task: TFormTask) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks`, {
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const updateTask = async (task: TTask) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks`, {
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
};

export const deleteTask = async (id: TTaskId) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};
