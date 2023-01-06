import React, { FC } from 'react';

import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';

interface TasksListTitleProps {
  title: string;
  tasksNumber: number;
}

const TasksListTitle: FC<TasksListTitleProps> = ({ title, tasksNumber }) => (
  <Badge badgeContent={tasksNumber} color="secondary">
    <Typography variant="h2">{title}</Typography>
  </Badge>
);

export default TasksListTitle;
