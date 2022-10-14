import { AppData } from '@graasp/apps-query-client';
import { PostAppDataType } from '../types/appData';

enum APP_DATA_TYPES {
  TASK = 'task',
  TASKSLIST = 'tasksList',
  FILTERED_MEMBERS = 'filtered_members',
  MOCK_TYPE = 'mock_type',
}

type TaskDataType = {
  title: string;
  description: string;
  members: Array<string>;
  label: string;
  tag?: string;
};

export type TaskType = PostAppDataType & {
  data: TaskDataType;
};
export type ExistingTaskType = AppData & {
  data: TaskDataType;
};

export { APP_DATA_TYPES };
