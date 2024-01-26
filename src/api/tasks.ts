import { TFormTask, TTask, TTaskId } from 'types/task';

export const getTasks = async (signal: AbortSignal): Promise<TTask[]> => {
  const tasksResponse = await fetch('http://localhost:5000/api/tasks', {
    signal,
  });
  const tasks = await tasksResponse.json();

  return tasks;
};

export const getOneTask = async (
  signal: AbortSignal,
  id: TTaskId
): Promise<TTask> => {
  const tasksResponse = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    signal,
  });
  const task = await tasksResponse.json();
  return task[0];
};

export const addTask = async (task: TFormTask) => {
  await fetch('http://localhost:5000/api/tasks', {
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const updateTask = async (task: TTask) => {
  // const newTask = {
  //   datetime: task.datetime,
  //   id: Number.parseInt(task.id),
  //   text: task.text,
  // };
  await fetch(`http://localhost:5000/api/tasks`, {
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
};

export const deleteTask = async (id: TTaskId) => {
  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};
