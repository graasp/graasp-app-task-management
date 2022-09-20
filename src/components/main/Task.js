/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdOutlineSubject, MdCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from './Modal';
import { taskProp } from '../../types/props_types';

const TaskCard = styled(Card)(() => ({
  width: '100%',
}));

// eslint-disable-next-line react/prop-types
const Task = ({ task, updateTask, deleteTask, className, contributions }) => {
  const { t } = useTranslation();

  const { id, data } = task;

  const { title, members, completed } = data;

  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(null);
  // const { isEditingTitle, setIsEditingTitle } = useContext(AppContext);

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

  const handleTitleChange = useCallback(
    (event) => {
      setEditedTitle(event.target.value);
    },
    [setEditedTitle],
  );
  const onDragOver = (ev) => {
    setFocused(true);
    ev.preventDefault();
  };

  const onDrop = (ev) => {
    setFocused(false);
    const member = ev.dataTransfer.getData('member');
    addMembers(member);
  };

  const renderConditional = () => (
    <div>{seen ? <Modal task={task} updateTask={updateTask} /> : null}</div>
  );

  const getMemberColor = (memberName) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const object of Object.entries(contributions)) {
      if (object[1].name === memberName) {
        return object[1].color;
      }
    }
    return null;
  };

  return (
    <TaskCard onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)}>
      <CardContent>
        {id === isEditingTitle ? (
          <input
            type="text"
            onChange={handleTitleChange}
            defaultValue={title}
            onKeyDown={onEditKeyDown}
          />
        ) : (
          // TODO: DELETE

          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <Typography
            variant="h4"
            sx={{
              cursor: 'pointer',
              alignContent: 'center',
              fontSize: '1.5em',
            }}
            gutterBottom
            onClick={() => setIsEditingTitle(id)}
          >
            {title}
          </Typography>
        )}
        {members.length !== 0 ? (
          <Stack direction="row">
            {members.map((member) => (
              // <small style={{ color: `${getMemberColor(member)}` }}>
              //   <MdCircle size="0.6em" />
              // </small>
              <Tooltip title={member}>
                <Avatar
                  sx={{
                    bgcolor: `${getMemberColor(member)}`,
                    width: 17,
                    height: 17,
                  }}
                  style={{ color: 'gray', fontSize: '9px' }}
                >
                  {member[0]}
                </Avatar>
              </Tooltip>
            ))}
          </Stack>
        ) : (
          <Typography variant="caption">
            {t('No member has been assigned to this task.')}
          </Typography>
        )}
        <CardActions>
          <div className="content" style={{ flexDirection: 'column' }}>
            <div className="row" style={{ alignItems: 'center' }}>
              <MdOutlineSubject
                size="1.3em"
                data-toggle="tooltip"
                data-placement="left"
                title={t('Task Details')}
                alt="task-details"
                style={{
                  cursor: 'pointer',
                  alignContent: 'center',
                }}
                className="task-details"
                onClick={togglePop}
              />

              <MdDelete
                className="delete-icon"
                size="1.3em"
                data-toggle="tooltip"
                data-placement="left"
                title={t('Delete Task')}
                alt="delete-task"
                onClick={() => deleteTask(id)}
              />
            </div>
          </div>
        </CardActions>
      </CardContent>
      {completed ? ' ' : renderConditional()}
    </TaskCard>
  );
};

Task.propTypes = {
  task: taskProp.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  className: PropTypes.oneOf([PropTypes.bool, PropTypes.string]).isRequired,
};

export default Task;
