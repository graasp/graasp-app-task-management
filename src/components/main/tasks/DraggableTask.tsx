import React, { FC, useState } from 'react';

import { UUID } from '@graasp/sdk';

import { styled } from '@mui/material/styles';

import { useDraggable } from '@dnd-kit/core';

import {
  ExistingTaskType,
  ExistingTaskTypeRecord,
} from '../../../config/appDataTypes';
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
  task: ExistingTaskTypeRecord;
  updateTask: (t: ExistingTaskTypeRecord) => void;
  deleteTask: (id: string) => void;
  membersColor: { [key: UUID]: string };
  key: number;
};

const DraggableTask: FC<DraggableTaskProps> = ({
  task,
  updateTask,
  deleteTask,
  membersColor,
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
        membersColor={membersColor}
        isDragging={isDragging}
        onEditDialogOpen={setDialogOpen}
      />
    </Draggable>
  );
};

export default DraggableTask;
