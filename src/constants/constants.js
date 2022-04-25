import { APP_DATA_TYPES } from '../config/appDataTypes';

/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500

export const DEFAULT_LIST = {
  todo: {
    title: 'To Do',
    items: [],
  },
  inProgress: {
    title: 'In Progress',
    items: [],
  },
  completed: {
    title: 'Completed',
    items: [],
  },
};

export const DEFAULT_TASK_DATA = {
  title: '',
  description: '',
  members: [],
};

export const DEFAULT_TASK = {
  type: APP_DATA_TYPES.TASK,
  visibility: 'item',
  data: DEFAULT_TASK_DATA,
};

export const APP_SETTINGS = {
  PROGRESS_BAR_DISPLAY: 'progress_bar_display',
};
