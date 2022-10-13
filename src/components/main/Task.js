/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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
import { Collection } from 'immutable';
import { taskProp } from '../../types/props_types';
import TaskEditDialog from './TaskEditDialog';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// eslint-disable-next-line react/prop-types
const Task = ({
  task,
  updateTask,
  deleteTask,
  className,
  members: membersList,
}) => {
  const { t } = useTranslation();

  const { id, data } = task;

  const { title, members, completed, description } = data;

  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(null);
  // const { isEditingTitle, setIsEditingTitle } = useContext(AppContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const editTask = () => {
    setDialogOpen(true);
  };

  const addMembers = (member) => {
    const newMembers = [...members, member];
    const newTask = {
      ...task,
      data: {
        ...data,
        members: [...new Set(newMembers)],
      },
    };
    updateTask(newTask);
  };

  const togglePop = () => {
    setSeen(!seen);
    setFocused(!focused);
  };

  const onEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newTask = {
        ...task,
        data: {
          ...data,
          title: editedTitle.length !== 0 ? editedTitle : title,
        },
      };
      updateTask(newTask);
      setIsEditingTitle(false);
    }
  };
  const onDragOver = (ev) => {
    setFocused(true);
    ev.preventDefault();
  };

  const onDrop = (ev) => {
    setFocused(false);
    const member = ev.dataTransfer.getData('member');
    addMembers(member);
  };

  const getMemberColor = (m) =>
    membersList.find((memberInList) => m === memberInList.id)?.color;

  const getMemberName = (m) =>
    membersList.find((memberInList) => m === memberInList.id)?.name || '?';

  return (
    <TaskCard onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)}>
      <CardHeader
        avatar={
          <AvatarGroup max={4}>
            {members.map((member) => (
              <Avatar
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

Task.propTypes = {
  task: taskProp.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  className: PropTypes.oneOf([PropTypes.bool, PropTypes.string]).isRequired,
  members: PropTypes.objectOf(Collection).isRequired,
};

export default Task;
