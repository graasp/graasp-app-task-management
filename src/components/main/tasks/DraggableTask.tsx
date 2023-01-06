import { List } from 'immutable';

import React, { FC, useState } from 'react';

import { styled } from '@mui/material/styles';

import { useDraggable } from '@dnd-kit/core';

import { ExistingTaskType } from '../../../config/appDataTypes';
import { Member } from '../../../types/member';
import Task from './Task';

const Draggable = styled('button')(() => ({
  background: 'none',
  color: 'inherit',
  border: 'none',
  padding: '0',
  font: 'inherit',
  cursor: 'grab',
  outline: 'inherit',
  appearance: 'none',
  textAlign: 'inherit',
}));

type DraggableTaskProps = {
  task: ExistingTaskType;
  updateTask: (t: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  key: number;
};

const DraggableTask: FC<DraggableTaskProps> = ({
  task,
  updateTask,
  deleteTask,
  members: membersList,
  key,
}) => {
  const { id, type } = task;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type,
    },
    disabled: dialogOpen,
  });

  return (
    <Draggable
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      disabled={dialogOpen}
    >
      <Task
        key={key}
        task={task}
        updateTask={updateTask}
        deleteTask={deleteTask}
        members={membersList}
        isDragging={isDragging}
        onEditDialogOpen={setDialogOpen}
      />
    </Draggable>
  );
};

export default DraggableTask;
