import { List } from 'immutable';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UUID } from '@graasp/sdk';
import { Button } from '@graasp/ui';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { useDroppable } from '@dnd-kit/core';

import {
  ExistingTaskType,
  ExistingTaskTypeRecord,
  TaskType,
} from '../../../config/appDataTypes';
import AddTask from './AddTask';
import DraggableTask from './DraggableTask';
import TasksListTitle from './TasksListTitle';

const FullHeightStack = styled(Stack)(() => ({
  height: '100%',
}));

type TasksListProps = {
  title: string;
  tasks: List<ExistingTaskTypeRecord>;
  label: string;
  addTask: (task: TaskType) => void;
  updateTask: (task: ExistingTaskTypeRecord) => void;
  deleteTask: (id: string) => void;
  membersColor: { [key: UUID]: string };
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
  membersColor,
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
      <FullHeightStack alignItems="center" position="relative">
        <TasksListTitle title={title} tasksNumber={tasks.size} />
        <Button
          size="small"
          variant="text"
          sx={{ position: 'absolute', right: 1, top: 1 }}
          onClick={onHide}
        >
          <ExpandMoreIcon />
        </Button>

        <FullHeightStack
          ref={setNodeRef}
          spacing={1}
          sx={{ m: 1, width: '100%' }}
        >
          {addComponent && <AddTask addTask={addTask} label={label} />}
          {tasks.size ? (
            tasks.map((task: ExistingTaskTypeRecord, key: number) => (
              <DraggableTask
                key={key}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                membersColor={membersColor}
              />
            ))
          ) : (
            <Typography variant="subtitle1">
              {t('NO_TASKS', { title })}
            </Typography>
          )}
        </FullHeightStack>
      </FullHeightStack>
    </Paper>
  );
};

export default TasksList;
