import { useState, useCallback, useEffect } from 'react';
import Modal from '../modal/Modal';
import Popup from './Popup';
import { useTranslation } from 'react-i18next';
import {
  MdDelete,
  MdSupervisedUserCircle,
  MdOutlineSubject,
} from 'react-icons/md';

const Task = (props) => {
  const { t } = useTranslation();

  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [members, setMembers] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  const addMembers = (id, listTitle) => {
    if (listTitle === 'To Do') {
      const updatedTasks = [...props.state.todo.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.concat(members);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          todo: {
            title: 'To Do',
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'In Progress') {
      const updatedTasks = [...props.state.inProgress.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.concat(members);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          inProgress: {
            title: 'In Progress',
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'Completed') {
      const updatedTasks = [...props.state.done.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.concat(members);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          done: {
            title: 'Completed',
            items: updatedTasks,
          },
        };
      });
    }
  };

  const removeMembers = (id, listTitle, member) => {
    if (listTitle === 'To Do') {
      const updatedTasks = [...props.state.todo.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.filter((e) => e !== member);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          todo: {
            title: 'To Do',
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'In Progress') {
      const updatedTasks = [...props.state.inProgress.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.filter((e) => e !== member);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          inProgress: {
            title: 'In Progress',
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'Completed') {
      const updatedTasks = [...props.state.done.items].map((task) => {
        if (task.id === id) {
          if (members) {
            task.members = task.members.filter((e) => e !== member);
            task.members = [...new Set(task.members)];
          }
        }
        return task;
      });
      props.setTasks(updatedTasks);
      props.setState((prev) => {
        return {
          ...prev,
          done: {
            title: 'Completed',
            items: updatedTasks,
          },
        };
      });
    }
  };

  //const [isAddingMembers,setIsAddingMembers]=useState(null)

  const togglePop = () => {
    setSeen(!seen);
    setFocused(!focused);
  };

  const onEditKeyDown = (event) => {
    if (event.keyCode === 13) {
      props.submitTitleEdits(props.task.id, props.listTitle);
      //After pressing the Enter key
    }
  };

  const handleTitleChange = useCallback(
    (event) => {
      props.setEditingTitle(event.target.value);
    },
    [props.setEditingTitle],
  );
  const handleMembers = useCallback(
    (value) => {
      setMembers(value);
    },
    [setMembers],
  );

  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  const onDrop = (ev) => {
    let member = ev.dataTransfer.getData('member');
    members.push(member);
    handleMembers(members);
    addMembers(props.task.id, props.listTitle);
    console.log(props.task.members);
  };

  const renderConditional = () => {
    return (
      <div>
        {seen ? (
          <Modal
            task={props.task}
            submitDescriptionEdits={props.submitDescriptionEdits}
            isEditingDescription={props.isEditingDescription}
            setIsEditingDescription={props.setIsEditingDescription}
            setEditingDescription={props.setEditingDescription}
            listTitle={props.listTitle}
            addMembers={addMembers}
            setMembers={setMembers}
            members={members}
            removeMembers={removeMembers}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div class="row" className="container-drag">
        <div
          className={
            focused
              ? `list-item-out row jc-space-between ${props.className} droppable`
              : `list-item row jc-space-between ${props.className}`
          }
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          {props.task.id === props.isEditingTitle && !props.task.completed ? (
            <input
              type="text"
              onChange={handleTitleChange}
              defaultValue={props.task.title}
              onKeyDown={onEditKeyDown}
            />
          ) : (
            <span
              className={
                props.task.completed ? 'text-task-complete' : 'text-task'
              }
              onClick={() => props.setIsEditingTitle(props.task.id)}
              style={{
                cursor: 'pointer',
                alignContent: 'center',
              }}
            >
              {props.task.title}
            </span>
          )}

          <div className="content">
            <div className="row">
              {/* <MdSupervisedUserCircle
                className="add-member"
                size="1.3em"
                data-toggle="tooltip"
                data-placement="left"
                style={{
                  cursor: 'pointer',
                }}
                title={t("Select Members")}
                onClick={() => setButtonPopup(true)}
              /> */}
              <MdOutlineSubject
                size="1.3em"
                data-toggle="tooltip"
                data-placement="left"
                title={props.task.completed ? null : 'Task Details'}
                alt="task-details"
                style={{
                  cursor: 'pointer',
                  alignContent: 'center',
                }}
                className={
                  props.task.completed
                    ? 'details-task-complete'
                    : 'details-task-incomplete'
                }
                onClick={togglePop}
              />

              <MdDelete
                className={
                  props.task.completed
                    ? 'delete-icon-complete'
                    : 'delete-icon-incomplete'
                }
                size="1.3em"
                data-toggle="tooltip"
                data-placement="left"
                title={t("Delete Task")}
                alt="delete-task"
                onClick={() => props.deleteTask(props.task.id, props.listTitle)}
              />
            </div>
          </div>
        </div>
      </div>
      {props.task.completed ? ' ' : renderConditional()}
      <Popup
        task={props.task}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        addMembers={addMembers}
        setMembers={setMembers}
        members={members}
        listTitle={props.listTitle}
        removeMembers={removeMembers}
      >
        <h3 style={{ color: 'black' }}>{t('Task Members')}</h3>
      </Popup>
    </div>
  );
};

export default Task;
