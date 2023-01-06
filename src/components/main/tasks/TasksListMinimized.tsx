import { List } from 'immutable';

import React, { forwardRef } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

import { ExistingTaskType } from '../../../config/appDataTypes';
import TasksListTitle from './TasksListTitle';

type TasksListMinimizedProps = {
  title: string;
  tasks: List<ExistingTaskType>;
  onShow: () => void;
};

const TasksListMinimized = forwardRef<
  HTMLButtonElement,
  TasksListMinimizedProps
>(({ title, tasks, onShow }, ref) => (
  <Button
    ref={ref}
    variant="outlined"
    endIcon={<ArrowForwardIosIcon />}
    onClick={onShow}
    sx={{ width: '100%', mt: 2 }}
  >
    <TasksListTitle title={title} tasksNumber={tasks.size} />
  </Button>
));

TasksListMinimized.displayName = 'TasksListMinimized';

export default TasksListMinimized;
