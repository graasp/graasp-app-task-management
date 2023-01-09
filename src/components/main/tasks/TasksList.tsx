import { List } from 'immutable';

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { useDroppable } from '@dnd-kit/core';

import { ExistingTaskType, TaskType } from '../../../config/appDataTypes';
import { Member } from '../../../types/member';
import AddTask from './AddTask';
import DraggableTask from './DraggableTask';
import TasksListTitle from './TasksListTitle';

type TasksListProps = {
  title: string;
  tasks: List<ExistingTaskType>;
  label: string;
  addTask: (task: TaskType) => void;
  updateTask: (task: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  addComponent: boolean;
  onHide: () => void;
};

const TasksList: FC<TasksListProps> = ({
  title,
  label,
  tasks,
  addTask,
  updateTask,
  deleteTask,
  addComponent,
  members,
  onHide,
}) => {
  const { t } = useTranslation();

  const { setNodeRef, isOver } = useDroppable({
    id: label,
  });

  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 1,
        pt: 2,
        mb: 1,
        backgroundColor: grey['100'],
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        overflowY: 'scroll',
        overflowX: 'visible',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        position: 'relative',
        zIndex: 1,
        boxShadow: isOver ? `0 0 1em ${theme.palette.primary.light}` : 'none',
        maxWidth: '40em',
      }}
      key={label}
    >
      <Stack alignItems="center" position="relative">
        <TasksListTitle title={title} tasksNumber={tasks.size} />
        <Button
          size="small"
          variant="text"
          sx={{ position: 'absolute', right: 1, top: 1 }}
          onClick={onHide}
        >
          <ExpandMoreIcon />
        </Button>

        <Stack ref={setNodeRef} spacing={1} sx={{ m: 1, width: '100%' }}>
          {addComponent && <AddTask addTask={addTask} label={label} />}
          {tasks.size ? (
            tasks.map((task: ExistingTaskType, key: number) => (
              <DraggableTask
                key={key}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                members={members}
              />
            ))
          ) : (
            <Typography variant="subtitle1">
              {t('NO_TASKS', { title })}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TasksList;
