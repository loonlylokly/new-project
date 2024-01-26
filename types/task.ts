export type TTask = {
  id: string;
  text: string;
  datetime: string;
};

export type TFormTask = Omit<TTask, 'id'>;

export enum EStatusEditTask {
  error = 'error',
  success = 'success',
}
