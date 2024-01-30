export const DEFAULT_DATA_FORMAT = 'YYYY-MM-DDTHH:mm';
export const DISPLAY_DATA_FORMAT = 'DD-MM-YYYY, HH:mm:ss';

export const TASK_VALIDATION = {
  datetime: {
    max: {
      message: 'Wrong date',
      value: 16,
    },
    min: {
      message: 'Wrong date',
      value: 16,
    },
  },
  text: {
    max: {
      message: 'Text is too long',
      value: 120,
    },
    min: {
      message: 'Text is too short',
      value: 3,
    },
  },
} as const;
