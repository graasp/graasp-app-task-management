import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdOutlineSubject } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { taskProp } from '../../types/props_types';

const Task = ({ task, updateTask, deleteTask, className }) => {
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
    if (event.keyCode === 13) {
      const newTask = {
        ...task,
        data: {
          ...data,
          title: editedTitle,
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
    // console.log('⚙️ A member is being added...');
    setFocused(false);
    const member = ev.dataTransfer.getData('member');
    // console.debug('🧑 The added member is:', member);
    addMembers(member);
    // console.log('☑️ A member was added: ', task.members);
  };

  const renderConditional = () => (
    <div>{seen ? <Modal task={task} updateTask={updateTask} /> : null}</div>
  );

  return (
    <div>
      <div className="row">
        <div
          className={
            focused
              ? `list-item-out row jc-space-between ${className} droppable`
              : `list-item row jc-space-between ${className} droppable`
          }
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          {id === isEditingTitle ? (
            <input
              type="text"
              onChange={handleTitleChange}
              defaultValue={title}
              onKeyDown={onEditKeyDown}
            />
          ) : (
            // TODO: DELETE
            /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
            <span
              className="text-task"
              onClick={() => setIsEditingTitle(id)}
              style={{
                cursor: 'pointer',
                alignContent: 'center',
              }}
            >
              {title}
            </span>
          )}

          <div className="content">
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
        </div>
      </div>
      {completed ? ' ' : renderConditional()}
    </div>
  );
};

Task.propTypes = {
  task: taskProp.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  className: PropTypes.oneOf([PropTypes.bool, PropTypes.string]).isRequired,
};

export default Task;
