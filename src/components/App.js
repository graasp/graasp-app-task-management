import React, { useState, useEffect } from 'react';
import Task from './main/Task';
import Students from './main/Students';
import Footer from './main/Footer';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { ACTION_TYPES } from '../config/actionTypes';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData } from './context/appData';
import _ from 'lodash';
import { v4 } from 'uuid';

const App = () => {


  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);

  const {
    data: appData,
    // isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess) {
      setTasks(appData.filter(({ type }) => type === APP_DATA_TYPES.TASK));
    }
  }, [appData, isAppDataSuccess]);

  const { t } = useTranslation();
  const [itemsList, setItemsList] = useState({
    todo: {
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
  });
  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    const json = localStorage.getItem('tasks');
    const loadedtasks = JSON.parse(json);
    if (loadedtasks) {
      setTasks(loadedtasks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);
  }, [tasks]);

  useEffect(() => {
    const dataFormLocalStorage = localStorage.getItem('task-input');
    if (dataFormLocalStorage) {
      setTaskInput(JSON.parse(dataFormLocalStorage));
    }
  }, [setTaskInput]);

  useEffect(() => {
    localStorage.setItem('task-input', JSON.stringify(taskInput));
  }, [taskInput]);

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAdd(event);
    }
  };
  useEffect(() => {
    const json = localStorage.getItem('itemsList');
    const loadedTasks = JSON.parse(json);
    if (loadedTasks) {
      setItemsList(loadedTasks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(itemsList);
    localStorage.setItem('itemsList', json);
  }, [itemsList]);

  //Add task

  const handleAdd = (e) => {
    e.preventDefault();
    const newTask = {
      id: v4(),
      title: task.title,
      description: task.description,
      members: task.members,
    };
    if (!task.title || !task.title.length || !task.title.trim().length) return;
    setTasks([...tasks, newTask]);
    setTask({ title: '', description: '', members: [] });
    setItemsList((prev) => {
      return {
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
          ],
        },
      };
    });
    setTaskInput((prev) => {
      return { ...prev, title: '' };
    });

    postAppData({
      data: task,
      type: APP_DATA_TYPES.TASK,
      visibility: 'item',
    });

    // postAppData({
    //   data: itemsList,
    //   type: APP_DATA_TYPES.TASKSLIST,
    //   visibility: 'item',
    // });

    postAction({
      type: ACTION_TYPES.ADD,
      data: {
        task: newTask,
        id: newTask.id,
      },
    });
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
  };

  //Delete task

  const deleteTask = (id, title) => {
    let updatedTasks = [...itemsList[itemsCategory(title)].items].filter(
      (task) => task.id !== id,
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
    });
    postAppData({
      data: itemsList,
      type: APP_DATA_TYPES.TASKSLIST,
      visibility: 'item',
    });

    postAction({
      type: ACTION_TYPES.DELETE,
      data: id,
    });
  };

  //Edit title
  const submitTitleEdits = (id, listTitle) => {
    const updatedTasks = [...itemsList[itemsCategory(listTitle)].items].map(
      (task) => {
        if (task.id === id) {
          if (editingTitle.trim().length !== 0) {
            task.title = editingTitle;
          }

          postAppData({
            data: task,
            type: APP_DATA_TYPES.TASK,
            visibility: 'item',
          });

          postAction({
            type: ACTION_TYPES.EDIT,
            data: {
              task: task,
              id: task.id,
            },
          });
        }
        return task;
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
    });
  };

  //Edit description

  const submitDescriptionEdits = (id, listTitle) => {
    const updatedTasks = [...itemsList[itemsCategory(listTitle)].items].map(
      (task) => {
        if (task.id === id) {
          if (editingDescription.trim().length !== 0) {
            task.description = editingDescription;
          }
          postAppData({
            data: task,
            type: APP_DATA_TYPES.TASK,
            visibility: 'item',
          });

          postAction({
            type: ACTION_TYPES.EDIT,
            data: {
              task: task,
              id: task.id,
            },
          });
        }
        return task;
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

    setItemsList((prev) => {
      prev = { ...prev };
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
    // postAppData({
    //   data: itemCopy,
    //   type: APP_DATA_TYPES.TASK,
    //   visibility: 'item',
    // });

    postAction({
      type: ACTION_TYPES.MOVE,
      data: {
        task: itemCopy,
        id: itemCopy.id,
      },
    });
  };

  let totalNumberOfTasks = 0;

  _.map(itemsList, (data) => (totalNumberOfTasks += data.items.length));

  return (
    <div class="row">
      <div class="column" className="members-column">
        <Students tasks={tasks} setTasks={setTasks} />
      </div>
      <div className="App" class="column">
        <div className="row">
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(itemsList, (data, key) => {
              return (
                <div key={key} className={'column'}>
                  <div>
                    <h3 style={{ color: 'black', textAlign: 'center' }}>
                      {data.title}&nbsp;
                      <sup style={{ color: 'rgb(201, 59, 59)' }}>
                        <small>{data.items.length}</small>
                      </sup>
                    </h3>
                  </div>

                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={'droppable-col'}
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
                            data.items.map((task, index) => {
                              return (
                                <Draggable
                                  key={task.id}
                                  index={index}
                                  draggableId={task.id}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
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
                                    );
                                  }}
                                </Draggable>
                              );
                            })
                          ) : (
                            <p className="no-item-text">
                              &nbsp;No Tasks {data.title}{' '}
                            </p>
                          )}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
        <div className="clear"></div>
      </div>
      <Footer
        numberOfCompletedTasks={itemsList.completed.items.length}
        totalNumberOfTasks={totalNumberOfTasks}
      />
    </div>
  );
};

export default App;
