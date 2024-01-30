export type TTask = { id: TTaskId } & TFormTask;

export type TTaskId = number;

export type TFormTask = {
  text: string;
  datetime: string;
};

export enum EStatusEditTask {
  error = 'error',
  success = 'success',
}
