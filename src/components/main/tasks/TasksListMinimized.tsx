import { List } from 'immutable';

import React, { forwardRef } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ExistingTaskType } from '../../../config/appDataTypes';

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
    <Badge badgeContent={tasks.size} color="secondary">
      <Typography variant="h2">{title}</Typography>
    </Badge>
  </Button>
));

TasksListMinimized.displayName = 'TasksListMinimized';

export default TasksListMinimized;
