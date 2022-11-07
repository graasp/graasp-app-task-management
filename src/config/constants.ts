import { APP_DATA_VISIBILITY } from '../types/appData';
import { APP_DATA_TYPES, TaskDataType, TaskType } from './appDataTypes';

export const APP_NAME = 'Graasp';

export const ENV = {
  DEVELOPMENT: 'development',
};
export const GRAASP_APP_ID = process.env.REACT_APP_GRAASP_APP_ID;

export const NODE_ENV =
  process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || ENV.DEVELOPMENT;

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_LANG = 'en';

// strings used in components/custom/CustomTooltip to generate added tooltip text in ActionsByTimeOfDay
export const LATE_NIGHT = 'Late night';
export const EARLY_MORNING = 'Early morning';
export const MORNING = 'Morning';
export const AFTERNOON = 'Afternoon';
export const EVENING = 'Evening';
export const NIGHT = 'Night';

/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500

export const TASK_LABELS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const DEFAULT_TASK_DATA: TaskDataType = {
  title: '',
  description: '',
  members: [],
  label: TASK_LABELS.TODO,
};

export const DEFAULT_TASK: TaskType = {
  type: APP_DATA_TYPES.TASK,
  visibility: APP_DATA_VISIBILITY.ITEM,
  data: DEFAULT_TASK_DATA,
};

/**
 * @deprecated This setting will be refactored.
 */
export const APP_SETTINGS = {
  PROGRESS_BAR_DISPLAY: 'progress_bar_display',
};

export const COLORS = [
  '#CAF0F6',
  '#FFDFD3',
  '#B6EECF',
  '#E0BBE4',
  '#A5D6EA',
  '#D7ECD9',
  '#B4C6DD',
  '#AE88F9',
  '#DDF1FF',
  '#D3EAFF',
];
