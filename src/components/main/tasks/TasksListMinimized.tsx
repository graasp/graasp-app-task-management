import React, { forwardRef } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type TasksListMinimizedProps = {
  title: string;
  tasksNumber?: number;
  onShow: () => void;
};

const TasksListMinimized = forwardRef<
  HTMLButtonElement,
  TasksListMinimizedProps
>(({ title, tasksNumber = 0, onShow }, ref) => (
  <Button
    ref={ref}
    variant="outlined"
    endIcon={<ArrowForwardIosIcon />}
    onClick={onShow}
    sx={{ width: '100%', mt: 2, pt: 2, pb: 2 }}
  >
    {/* <TasksListTitle title={title} tasksNumber={tasks.size} /> */}
    <Badge badgeContent={tasksNumber} color="secondary">
      <Typography>{title}</Typography>
    </Badge>
  </Button>
));

TasksListMinimized.displayName = 'TasksListMinimized';

export default TasksListMinimized;
