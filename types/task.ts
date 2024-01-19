export type TTask = {
  id: string;
  text: string;
  datetime: string;
};

export type TFormTask = {
  text: string;
  datetime: string;
};

export enum EStatusEditTask {
  error = 'error',
  success = 'success',
}
