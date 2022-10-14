/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AvatarGroup from '@mui/material/AvatarGroup';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import { List } from 'immutable';
import TaskEditDialog from './TaskEditDialog';
import { ExistingTaskType } from '../../config/appDataTypes';
import { Member } from '../../types/member';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   // eslint-disable-next-line react/jsx-props-no-spreading
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

type TaskProps = {
  task: ExistingTaskType;
  updateTask: (t: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
};

const Task = (props: TaskProps): JSX.Element => {
  const { task, updateTask, deleteTask, members: membersList } = props;
  const { t } = useTranslation();

  const { id, data } = task;

  const { title, members, description } = data;

  // const { isEditingTitle, setIsEditingTitle } = useContext(AppContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = (): void => {
    setDialogOpen(false);
  };

  const editTask = (): void => {
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
    addMembers(member);
  };

  const getMemberColor = (m: string): string | undefined =>
    membersList.find((memberInList) => m === memberInList.id)?.color;

  const getMemberName = (m: string): string =>
    membersList.find((memberInList) => m === memberInList.id)?.name || '?';

  return (
    <TaskCard onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)}>
      <CardHeader
        avatar={
          <AvatarGroup max={4}>
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
      />
    </TaskCard>
  );
};

export default Task;
