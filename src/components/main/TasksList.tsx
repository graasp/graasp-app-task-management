/* eslint-disable arrow-body-style */

import React from 'react';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { List } from 'immutable';
import { useDroppable } from '@dnd-kit/core';
import AddTask from './AddTask';
import Task from './Task';
import { ExistingTaskType, TaskType } from '../../config/appDataTypes';
import { Member } from '../../types/member';
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

  const showSkeleton = (): boolean => {
    let isTaskHere = false;
    if (active) {
      isTaskHere =
        tasks.find((t) => t.data.id === active.id)?.data.label === label;
    }
    console.log(
      'label: ',
      label,
      ' isTaskHere: ',
      isTaskHere,
      ', isOver: ',
      isOver,
      ' active: ',
      active,
      'tasks: ',
      tasks,
    );
    return isOver && !isTaskHere;
  };

  return (
    <Paper sx={{ p: 1, pt: 2 }}>
      <Stack key={label} alignItems="center">
        <Badge badgeContent={tasks.size} color="primary">
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
