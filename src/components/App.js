/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { v4 } from 'uuid';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { ACTION_TYPES } from '../config/actionTypes';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData } from './context/appData';
import Task from './main/Task';
import Students from './main/Students';
import Footer from './main/Footer';

const App = () => {
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  // const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const [tasks, setTasks] = useState([]);
  // const [tmpCopy, setTmpCopy] = useState({});

  const {
    data: appData,
    // isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();

  const defaultList={
    todo:{
      title: 'To Do',
      items: [],
    },
    inProgress: {
      title: 'In Progress',
      items: [],
    },
    completed: {
      title: 'Completed',
      items: [],
    },
  };

  const [itemsList, setItemsList] = useState(defaultList);

  useEffect(() => {
    let tmp={};
    if (isAppDataSuccess) {
      
      tmp=appData.filter(({ type }) => type === APP_DATA_TYPES.TASKSLIST);
      if (tmp.size===0) {
        setItemsList(defaultList);
        postAppData({
          data: itemsList,
          type: APP_DATA_TYPES.TASKSLIST,
          visibility: 'item',
        });
      }
      else{
        // TODO: DELETE
        /* eslint-disable-next-line no-underscore-dangle */
        setItemsList(tmp._tail.array[tmp._tail.array.length-1].data);
        }
    }
    
  }, [appData, isAppDataSuccess]);


  const { t } = useTranslation();

  const [task, setTask] = useState({
    title: '',
    description: '',
    members: [],
  });
  const [taskInput, setTaskInput] = useState({
    title: '',
    description: '',
    members: [],
  });
  const [isEditingTitle, setIsEditingTitle] = useState(null);
  const [isEditingDescription, setIsEditingDescription] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');

  // Add task
  const handleAdd = (e) => {
    e.preventDefault();

    const newTask = {
      id: v4(),
      title: task.title,
      description: task.description,
      members: task.members,
      label: 'To Do',
    };
    if (!task.title || !task.title.length || !task.title.trim().length) return;
    setTasks([...tasks, newTask]);
    setTask({ title: '', description: '', members: [] });
    setItemsList((prev) => ({
        ...prev,
        todo: {
          title: 'To Do',
          items: [
            {
              id: v4(),
              title: newTask.title,
              description: newTask.description,
              members: newTask.members,
            },
            ...prev.todo.items,
          ]
        }
      }));

  setTaskInput((prev) => ({ ...prev, title: '' }));
  };

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAdd(event);
    }
  };

  const itemsCategory = (title) => {
    if (title === 'To Do') {
      return 'todo';
    }
    if (title === 'In Progress') {
      return 'inProgress';
    }
    if (title === 'Completed') {
      return 'completed';
    }
    return null;
  };

  // Delete task

  const deleteTask = (id, title) => {
    const updatedTasks = [...itemsList[itemsCategory(title)].items].filter(
      (ta) => ta.id !== id,
    );
    setTasks(updatedTasks);
    setItemsList((prev) => {
      if (title === 'To Do') {
        return {
          ...prev,
          todo: {
            title,
            items: updatedTasks,
          },
        };
      }
      if (title === 'In Progress') {
        return {
          ...prev,
          inProgress: {
            title,
            items: updatedTasks,
          },
        };
      }
      if (title === 'Completed') {
        return {
          ...prev,
          completed: {
            title,
            items: updatedTasks,
          },
        };
      }
      return null;
    });
  };

  // Edit title
  const submitTitleEdits = (id, listTitle) => {
    const updatedTasks = [...itemsList[itemsCategory(listTitle)].items].map(
      (ta) => {
        if (ta.id === id) {
          if (editingTitle.trim().length !== 0) {
            const newTask = {
              ...ta,
              title: editingTitle,
            };
            return newTask;
          }
        }
        return null;
      },
    );
    setTasks(updatedTasks);
    setIsEditingTitle(null);
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
          completed: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      return null;
    });
  };

  // Edit description

  const submitDescriptionEdits = (id, listTitle) => {
    const updatedTasks = [...itemsList[itemsCategory(listTitle)].items].map(
      (ta) => {
        if (ta.id === id) {
          if (editingDescription.trim().length !== 0) {
            const newTask = {
              ...ta,
              description: editingDescription,
            }
            return newTask;
          }
        }
        return null;
      },
    );
    setTasks(updatedTasks);
    setIsEditingDescription(null);
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
          completed: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      }
      return null;
    });
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from itemsList
    const itemCopy = { ...itemsList[source.droppableId].items[source.index] };

    setItemsList((previousItemsList) => {
      const prev = { ...previousItemsList };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy,
      );

      return prev;
    });

    postAction({
      type: ACTION_TYPES.MOVE,
      data: {
        task: itemCopy,
        id: itemCopy.id,
      },
    });
  };

  const saveAction=()=>{
    const updatedList = {
      ...itemsList,
    };
    postAppData({
      data: updatedList,
      type: APP_DATA_TYPES.TASKSLIST,
      visibility: 'item',
    });
  }

  let totalNumberOfTasks = 0;
 
  /* eslint-disable-next-line no-return-assign */
  _.map(itemsList, (data) => (totalNumberOfTasks += data.items.length));
  return (
    <div className="row">
      <div className="members-column column">
        <Students tasks={tasks} setTasks={setTasks} />
        <button
        type='button'
        onClick={saveAction}
        >
            Save
          </button>
      </div>
      <div className="App column">
        <div className="row">
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(itemsList, (data, key) => (
                <div key={key} className='column'>
                  <div>
                    <h3 style={{ color: 'black', textAlign: 'center' }}>
                      {data.title}&nbsp;
                      <sup style={{ color: 'rgb(201, 59, 59)' }}>
                        <small>{data.items.length}</small>
                      </sup>
                    </h3>
                  </div>

                  <Droppable droppableId={key}>
                    {(provided,) => (
                        <div
                          ref={provided.innerRef}
                          // TODO: DELETE
                          /* eslint-disable-next-line react/jsx-props-no-spreading */
                          {...provided.droppableProps}
                          className='droppable-col'
                        >
                          {data.title === 'To Do' ? (
                            <div>
                              <div
                                className="row"
                                style={{
                                  alignSelf: 'center',
                                  marginTop: '10px',
                                }}
                              >
                                <input
                                  className={`${
                                    task.title.trim()
                                      ? 'text-input-out'
                                      : 'text-input'
                                  }`}
                                  InputProps={{ disableUnderline: true }}
                                  value={taskInput.title}
                                  placeholder={t('New Task')}
                                  onKeyDown={inputKeyDown}
                                  onChange={(event) => {
                                    setTask({
                                      ...task,
                                      title: event.target.value,
                                    });
                                    setTaskInput({
                                      ...taskInput,
                                      title: event.target.value,
                                    });
                                  }}
                                />
                                <MdAddCircle
                                  type="submit"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title={t('Add Task')}
                                  alt="add-task"
                                  className={`${
                                    task.title.trim()
                                      ? 'active-add-icon'
                                      : 'add-icon'
                                  }`}
                                  onClick={handleAdd}
                                />
                              </div>
                              <br />
                            </div>
                          ) : null}

                          {data.items.length ? (
                            data.items.map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  index={index}
                                  draggableId={task.id}
                                >
                                  {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        // TODO: DELETE
                                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                                        {...provided.draggableProps}
                                        // TODO: DELETE
                                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                                        {...provided.dragHandleProps}
                                      >
                                        <Task
                                          className={
                                            snapshot.isDragging && 'dragging'
                                          }
                                          itemsCategory={itemsCategory}
                                          task={task}
                                          setTasks={setTasks}
                                          itemsList={itemsList}
                                          setItemsList={setItemsList}
                                          listTitle={data.title}
                                          handleAdd={handleAdd}
                                          deleteTask={deleteTask}
                                          submitTitleEdits={submitTitleEdits}
                                          isEditingTitle={isEditingTitle}
                                          setIsEditingTitle={setIsEditingTitle}
                                          setEditingTitle={setEditingTitle}
                                          submitDescriptionEdits={
                                            submitDescriptionEdits
                                          }
                                          isEditingDescription={
                                            isEditingDescription
                                          }
                                          setIsEditingDescription={
                                            setIsEditingDescription
                                          }
                                          setEditingDescription={
                                            setEditingDescription
                                          }
                                        />
                                      </div>
                                    )
                                  }
                                </Draggable>
                              )
                            )
                          ) : (
                            <p className="no-item-text">
                              &nbsp;No Tasks {data.title}{' '}
                            </p>
                          )}
                          {provided.placeholder}
                        </div>
                      )
                    }
                  </Droppable>
                </div>
              )
            )}
          </DragDropContext>
        </div>
        <div className="clear" />
      </div>
      <Footer
        numberOfCompletedTasks={itemsList.completed.items.length}
        totalNumberOfTasks={totalNumberOfTasks}
      />
    </div>
  );
};

export default App;
