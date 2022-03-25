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
import { useAppData, /* useAppActions */ } from './context/appData';


import _ from 'lodash';
import { v4 } from 'uuid';

const App = () => {

  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);


  const {
    data: appData,
    /* eslint-disable-next-line no-unused-vars */
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();



  useEffect(() => {
    if (isAppDataSuccess && !appData.isEmpty()) {
      setTasks(appData.filter(({ type }) => type === APP_DATA_TYPES.TASK));
    } else if (isAppDataSuccess && appData.isEmpty()) {
      setTasks(null);
    }
  }, [appData, isAppDataSuccess, postAppData]);



  const { t } = useTranslation();
  const [state, setState] = useState({
    todo: {
      title: 'To Do',
      items: [],
    },
    inProgress: {
      title: 'In Progress',
      items: [],
    },
    done: {
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

  //Add task

  const handleAdd = (e) => {
    e.preventDefault();
    //window.localStorage.clear();
    const newTask = {
      id: v4(),
      title: task.title,
      description: task.description,
      members: task.members,
    };
    if (!task.title || !task.title.length || !task.title.trim().length) return;
    setTasks([...tasks].concat(newTask));
    setTask({ title: '', description: '', members: [] });
    setState((prev) => {
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
    if (newTask?.id) {
      patchAppData({
        data: newTask,
        id: task.id,
      });
    } else {
      postAppData({
        data: newTask,
        type: APP_DATA_TYPES.TASK,
        visibility: 'item',
      });
    }
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
      return 'done';
    }
  };

  //Delete task

  const deleteTask = (id, title) => {
    let updatedTasks = [...state[itemsCategory(title)].items].filter(
      (task) => task.id !== id,
    );
    setTasks(updatedTasks);
    setState((prev) => {
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
          done: {
            title,
            items: updatedTasks,
          },
        };
      }
    });

    postAction({
      type: ACTION_TYPES.DELETE,
      data: id ,
    })
  };

  //Edit title
  const submitTitleEdits = (id, listTitle) => {
    const updatedTasks = [...state[itemsCategory(listTitle)].items].map(
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
    setState((prev) => {
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

  //Edit description

  const submitDescriptionEdits = (id, listTitle) => {
    const updatedTasks = [...state[itemsCategory(listTitle)].items].map(
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
    setState((prev) => {
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

 

  useEffect(() => {
    const json = localStorage.getItem('state');
    const loadedTasks = JSON.parse(json);
    if (loadedTasks) {
      setState(loadedTasks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(state);
    localStorage.setItem('state', json);
  }, [state]);

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

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
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
  };

  const onDragTask=(task)=>{
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

  let totalNumberOfTasks = 0;

  _.map(state, (data) => (totalNumberOfTasks += data.items.length));

  return (
    <div class="row">
      <div class="column" className="members-column">
        <Students tasks={tasks} setTasks={setTasks} />
      </div>
      <div className="App" class="column">
        <div className="row jc-space-between">
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
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
                                        onDrag={onDragTask(task)}
                                      >
                                        <Task
                                          className={
                                            snapshot.isDragging && 'dragging'
                                          }
                                          itemsCategory={itemsCategory}
                                          task={task}
                                          setTask={setTask}
                                          tasks={tasks}
                                          setTasks={setTasks}
                                          state={state}
                                          setState={setState}
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

        <Footer
          height={20}
          numberOfCompletedTasks={state.done.items.length}
          totalNumberOfTasks={totalNumberOfTasks}
        />
      </div>
    </div>
  );
};

export default App;
