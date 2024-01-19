/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (
  cb: (...args: any[]) => void,
  delay: number = 1000
) => {
  let timeout: string | number | NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
