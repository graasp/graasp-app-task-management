import { AppData } from '@graasp/apps-query-client';

import { APP_DATA_VISIBILITY, PostAppDataType } from '../types/appData';

enum APP_DATA_TYPES {
  TASK = 'task',
}

export type TaskDataType = {
  title: string;
  description: string;
  members: Array<string>;
  label: string;
  tags?: string;
};

export type TaskType = PostAppDataType & {
  data: TaskDataType;
};
export type ExistingTaskType = AppData & {
  data: TaskDataType;
};

export { APP_DATA_TYPES };
