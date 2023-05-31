import React, { DragEvent, FC, MouseEvent, useState } from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { UUID } from '@graasp/sdk';

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

import {
  ExistingTaskType,
  ExistingTaskTypeRecord,
} from '../../../config/appDataTypes';
import { useMembersContext } from '../../context/MembersContext';
import TaskEditDialog from './TaskEditDialog';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

type TaskProps = {
  t: TFunction;
  task: ExistingTaskTypeRecord;
  updateTask?: (t: ExistingTaskTypeRecord) => void;
  deleteTask?: (id: string) => void;
  membersColor: { [key: UUID]: string };
  key: number;
  isDragging?: boolean;
  onEditDialogOpen?: (isOpen: boolean) => void;
};

const Task: FC<TaskProps> = ({
  task,
  t,
  updateTask = () => {
    const message = 'TASK_CANNOT_BE_UPDATED';
    toast.error(t(message), {
      toastId: message,
      position: 'bottom-right',
    });
  },
  deleteTask = () => {
    const message = 'TASK_CANNOT_BE_DELETED';
    toast.error(t(message), {
      toastId: message,
      position: 'bottom-right',
    });
  },
  membersColor,
  key,
  isDragging = false,
  onEditDialogOpen = () => {
    /* Do nothing */
  },
}) => {
  const membersList = useMembersContext();
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
    updateTask(task.setIn(['data', 'members'], newMembers));
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
      onDragOver={(e: DragEvent<HTMLDivElement>) => onDragOver(e)}
      onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(e)}
      raised={isDragging}
      sx={{
        position: 'relative',
        zIndex: isDragging ? 2 : 'auto',
      }}
      key={key}
      onClick={(event: MouseEvent) => {
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
                  bgcolor: `${membersColor[member.id]}`,
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

export default withTranslation()(Task);
