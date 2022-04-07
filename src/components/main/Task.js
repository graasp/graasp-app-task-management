import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdOutlineSubject } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from './Modal';

const Task = ({
  itemsList,
  itemsCategory,
  setTasks,
  setItemsList,
  task,
  submitTitleEdits,
  listTitle,
  setEditingTitle,
  deleteTask,
  className,
  isEditingTitle,
  submitDescriptionEdits,
  setIsEditingDescription,
  isEditingDescription,
  setEditingDescription,
  setIsEditingTitle,
}) => {
  const { t } = useTranslation();

  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [members, setMembers] = useState([]);

  const addMembers = (id, currentListTitle) => {
    const { items } = itemsList[itemsCategory(currentListTitle)];

    const updatedTasks = [items].map((ta) => {
      if (ta.id === id) {
        if (members) {
          const newTask = {
            ...ta,
            members: [... new Set(ta.members.concat(members))]
          };
          return newTask;
        }
      }
      return ta;
    });
    setTasks(updatedTasks);
    setItemsList((prev) => {
      if (listTitle === 'To Do') {
        return {
          ...prev,
          todo: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      if (listTitle === 'In Progress') {
        return {
          ...prev,
          inProgress: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      if (listTitle === 'Completed') {
        return {
          ...prev,
          done: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      return null;
    });
  };

  const removeMembers = (id, currentListTitle, member) => {
    const { items } = itemsList[itemsCategory(currentListTitle)];
    const updatedTasks = [items].map((ta) => {
      if (ta.id === id) {
        if (members) {
          const newTask = {
            ...ta,
            members: [...new Set(ta.members.filter((e) => e !== member))],
          };
          return newTask;
        }
      }
      return ta;
    });
    setTasks(updatedTasks);
    setItemsList((prev) => {
      if (listTitle === 'To Do') {
        return {
          ...prev,
          todo: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      if (listTitle === 'In Progress') {
        return {
          ...prev,
          inProgress: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      if (listTitle === 'Completed') {
        return {
          ...prev,
          done: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      return null;
    });
  };

  const togglePop = () => {
    setSeen(!seen);
    setFocused(!focused);
  };

  const onEditKeyDown = (event) => {
    if (event.keyCode === 13) {
      submitTitleEdits(task.id, listTitle);
      // After pressing the Enter key
    }
  };

  const handleTitleChange = useCallback(
    (event) => {
      setEditingTitle(event.target.value);
    },
    [setEditingTitle],
  );
  const onDragOver = (ev) => {
    setFocused(true);
    ev.preventDefault();
  };

  const handleMembers = useCallback(
    (value) => {
      setMembers(value);
    },
    [setMembers],
  );

  const onDrop = (ev) => {
    setFocused(false);
    const member = ev.dataTransfer.getData('member');
    members.push(member);
    handleMembers(members);
    addMembers(task.id, listTitle);
    console.log(task.members);
  };

  const renderConditional = () => (
      <div>
        {seen ? (
          <Modal
            task={task}
            submitDescriptionEdits={submitDescriptionEdits}
            isEditingDescription={isEditingDescription}
            setIsEditingDescription={setIsEditingDescription}
            setEditingDescription={setEditingDescription}
            listTitle={listTitle}
            addMembers={addMembers}
            setMembers={setMembers}
            members={members}
            removeMembers={removeMembers}
          />
        ) : null}
      </div>
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
          {task.id === isEditingTitle ? (
            <input
              type="text"
              onChange={handleTitleChange}
              defaultValue={task.title}
              onKeyDown={onEditKeyDown}
            />
          ) : (
            // TODO: DELETE
            /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
            <span
              className="text-task"
              onClick={() => setIsEditingTitle(task.id)}
              style={{
                cursor: 'pointer',
                alignContent: 'center',
              }}
            >
              {task.title}
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
                onClick={() => deleteTask(task.id, listTitle)}
              />
            </div>
          </div>
        </div>
      </div>
      {task.completed ? ' ' : renderConditional()}
    </div>
  );
};

Task.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemsCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  setTasks: PropTypes.func.isRequired,
  setItemsList: PropTypes.func.isRequired,
  submitTitleEdits: PropTypes.func.isRequired,
  listTitle: PropTypes.string.isRequired,
  setEditingTitle: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isEditingTitle: PropTypes.bool,
  submitDescriptionEdits: PropTypes.func.isRequired,
  setIsEditingDescription: PropTypes.func.isRequired,
  isEditingDescription: PropTypes.bool,
  setEditingDescription: PropTypes.func.isRequired,
  setIsEditingTitle: PropTypes.func.isRequired,
};

Task.defaultProps = {
  isEditingTitle: false,
  isEditingDescription: false,
}

export default Task;
