import { List } from 'immutable';

import React from 'react';

import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import { useDroppable } from '@dnd-kit/core';

import { ExistingTaskType, TaskType } from '../../config/appDataTypes';
import { Member } from '../../types/member';
import AddTask from './AddTask';
import Task from './Task';
import TaskSkeleton from './TaskSkeleton';

type TasksListProps = {
  title: string;
  tasks: List<ExistingTaskType>;
  label: string;
  addTask: (task: TaskType) => void;
  updateTask: (task: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  addComponent: boolean;
};

const TasksList = (props: TasksListProps): JSX.Element => {
  const {
    title,
    label,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    addComponent,
    members,
  } = props;

  const { setNodeRef, isOver, active } = useDroppable({
    id: label,
  });

  // TODO: Doesn't work. Refactor.
  const showSkeleton = (): boolean => {
    let isTaskHere = false;
    if (active) {
      isTaskHere =
        tasks.find((t) => t.data.id === active.id)?.data?.label === label;
    }
    return isOver && !isTaskHere;
  };

  return (
    <Paper sx={{ p: 1, pt: 2, backgroundColor: grey['100'], height: '100%' }}>
      <Stack key={label} alignItems="center">
        <Badge badgeContent={tasks.size} color="secondary">
          <Typography variant="h2">{title}</Typography>
        </Badge>

        <Stack ref={setNodeRef} spacing={1} sx={{ m: 1, width: '100%' }}>
          {addComponent && <AddTask addTask={addTask} label={label} />}
          {showSkeleton() && <TaskSkeleton />}
          {tasks.size ? (
            tasks.map((task: ExistingTaskType, key: number) => (
              <Task
                key={key}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                members={members}
              />
            ))
          ) : (
            <Typography variant="subtitle1">No Tasks {title}</Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TasksList;
