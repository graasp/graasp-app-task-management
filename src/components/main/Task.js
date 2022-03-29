import { useState, useCallback } from 'react';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdOutlineSubject } from 'react-icons/md';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { ACTION_TYPES } from '../../config/actionTypes';
import { APP_DATA_TYPES } from '../../config/appDataTypes';

const Task = (props) => {
  const { t } = useTranslation();

  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);

  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [members, setMembers] = useState([]);

  const addMembers = (id, listTitle) => {
    const updatedTasks = [
      ...props.itemsList[props.itemsCategory(listTitle)].items,
    ].map((task) => {
      if (task.id === id) {
        if (members) {
          task.members = task.members.concat(members);
          task.members = [...new Set(task.members)];
        }
        postAppData({
          data: task,
          type: APP_DATA_TYPES.TASK,
          visibility: 'item',
        });

        postAction({
          type: ACTION_TYPES.SAVE,
          data: {
            task: task,
            id: task.id,
          },
        });
      }
      return task;
    });
    props.setTasks(updatedTasks);
    props.setItemsList((prev) => {
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
    });
  };

  const removeMembers = (id, listTitle, member) => {
    const updatedTasks = [
      ...props.itemsList[props.itemsCategory(listTitle)].items,
    ].map((task) => {
      if (task.id === id) {
        if (members) {
          task.members = task.members.filter((e) => e !== member);
          task.members = [...new Set(task.members)];
        }
      }
      return task;
    });
    props.setTasks(updatedTasks);
    props.setItemsList((prev) => {
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
    });
  };

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
                onClick={() => props.deleteTask(props.task.id, props.listTitle)}
              />
            </div>
          </div>
        </div>
      </div>
      {props.task.completed ? ' ' : renderConditional()}
    </div>
  );
};

export default Task;
