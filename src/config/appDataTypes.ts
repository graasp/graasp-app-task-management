import { AppData } from '@graasp/sdk';
import { ImmutableCast } from '@graasp/sdk/frontend';

import { PostAppDataType } from '../types/appData';

enum APP_DATA_TYPES {
  TASK = 'task',
}

export type TaskDataType = {
  title: string;
  description: string;
  members: string[];
  label: string;
  tags?: string;
};

export type TaskType = PostAppDataType & {
  data: TaskDataType;
};
export type ExistingTaskType = AppData & {
  data: TaskDataType;
};

export type ExistingTaskTypeRecord = ImmutableCast<ExistingTaskType>;

export { APP_DATA_TYPES };
