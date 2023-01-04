import { List } from 'immutable';

import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useDraggable } from '@dnd-kit/core';

import { ExistingTaskType } from '../../config/appDataTypes';
import { Member } from '../../types/member';
import TaskEditDialog from './TaskEditDialog';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

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

type TaskProps = {
  task: ExistingTaskType;
  updateTask: (t: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  key: number;
  isOverlay?: boolean;
};

const Task: FC<TaskProps> = ({
  task,
  updateTask,
  deleteTask,
  members: membersList,
  key,
  isOverlay = false,
}) => {
  const { t } = useTranslation();

  const { id, data, type } = task;

  const { title, members, description } = data;

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = (): void => {
    setDialogOpen(false);
  };

  const editTask = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setDialogOpen(true);
  };

  const addMembers = (member: string): void => {
    const newMembers = [...members, member];
    const newTask = {
      ...task,
      data: {
        ...data,
        members: newMembers,
      },
    };
    updateTask(newTask);
  };

  const onDragOver = (ev: React.DragEvent): void => {
    ev.preventDefault();
  };

  const onDrop = (ev: React.DragEvent): void => {
    const member = ev.dataTransfer.getData('member');
    if (!members.includes(member)) {
      addMembers(member);
    }
  };

  const getMemberColor = (m: string): string | undefined =>
    membersList.find((memberInList) => m === memberInList.id)?.color;

  const getMemberName = (m: string): string =>
    membersList.find((memberInList) => m === memberInList.id)?.name ||
    t('Unknown');

  const renderTask = (isDragging: boolean): JSX.Element => (
    <TaskCard
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
      raised={isDragging}
      sx={{
        position: 'relative',
        zIndex: isDragging ? 2 : 'auto',
      }}
      key={key}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <CardHeader
        avatar={
          <AvatarGroup max={3}>
            {members.map((member) => (
              <Avatar
                key={member}
                sx={{
                  bgcolor: `${getMemberColor(member)}`,
                }}
                alt={getMemberName(member)}
              >
                {getMemberName(member)[0]}
              </Avatar>
            ))}
          </AvatarGroup>
        }
        title={title}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label={t('Delete task')}
          onClick={() => deleteTask(id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label={t('Edit task')} onClick={editTask}>
          <EditIcon />
        </IconButton>
      </CardActions>
      <TaskEditDialog
        task={task}
        updateTask={updateTask}
        open={dialogOpen}
        onClose={handleDialogClose}
        members={membersList}
      />
    </TaskCard>
  );

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type,
    },
    disabled: dialogOpen,
  });

  // const transformation: React.CSSProperties = {
  //   transform: CSS.Translate.toString(transform),
  // };

  if (isOverlay) {
    return renderTask(true);
  }
  return (
    <Draggable
      type="button"
      ref={setNodeRef}
      // style={transformation}
      {...listeners}
      {...attributes}
      disabled={dialogOpen}
    >
      {renderTask(isDragging)}
    </Draggable>
  );
};

export default Task;
