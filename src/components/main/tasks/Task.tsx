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

import { ExistingTaskType } from '../../../config/appDataTypes';
import { Member } from '../../../types/member';
import TaskEditDialog from './TaskEditDialog';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

type TaskProps = {
  task: ExistingTaskType;
  updateTask: (t: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  key: number;
  isDragging?: boolean;
  onEditDialogOpen?: (isOpen: boolean) => void;
};

const Task: FC<TaskProps> = ({
  task,
  updateTask,
  deleteTask,
  members: membersList,
  key,
  isDragging = false,
  onEditDialogOpen = () => {
    /* Do nothing */
  },
}) => {
  const { t } = useTranslation();

  const { id, data } = task;

  const { title, members: membersIds, description } = data;

  const members = membersList.filter(({ id: mId }) => membersIds.includes(mId));

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    onEditDialogOpen(false);
  };

  const editTask = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setDialogOpen(true);
    onEditDialogOpen(true);
  };

  const addMembers = (member: string): void => {
    const newMembers = [...membersIds, member];
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
    if (!membersIds.includes(member)) {
      addMembers(member);
    }
  };

  return (
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
                key={member.id}
                sx={{
                  bgcolor: `${member.color}`,
                }}
                alt={member.name}
              >
                {member.name[0]}
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
          aria-label={t('Delete task') || 'Delete task'}
          onClick={() => deleteTask(id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label={t('Edit task') || 'Edit task'}
          onClick={editTask}
        >
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
};

export default Task;
