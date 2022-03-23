import React, { useState, useEffect } from 'react';
import {
  useAppData,
  useAppContext /* useAppActions */,
} from './context/appData';
import Task from './main/Task';
import Students from './main/Students';
import Footer from './main/Footer';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { ACTION_TYPES } from '../config/actionTypes';
import { useMutation, MUTATION_KEYS } from '../config/queryClient';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { v4 } from 'uuid';

const App = () => {
  const { t } = useTranslation();

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
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const [avStudents, setAvStudents] = useState([]);
  const { data: appContext, isLoading: isAppContextLoading } = useAppContext();

  const {
    data: appData,
    /* eslint-disable-next-line no-unused-vars */
    isLoading: isAppDataLoading,
    isSuccess: isAppDataSuccess,
  } = useAppData();

  useEffect(() => {
    if (isAppContextLoading) {
      setAvStudents([]);
    } else {
      setAvStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextLoading]);

  useEffect(() => {
    if (isAppDataSuccess && !appData.isEmpty()) {
      setTasks(appData.filter(({ type }) => type === APP_DATA_TYPES.TASK));
    } else if (isAppDataSuccess && appData.isEmpty()) {
      setTasks(null);
    }
  }, [appData, isAppDataSuccess, postAppData]);

  console.log(avStudents);

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
    console.log(tasks);
    setTaskInput((prev) => {
      return { ...prev, title: '' };
    });
  };

  //Delete task

  const deleteTask = (id, title) => {
    if (title === 'To Do') {
      let updatedTasks = [...state.todo.items].filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setState((prev) => {
        return {
          ...prev,
          todo: {
            title: title,
            items: updatedTasks,
          },
        };
      });
    }
    if (title === 'In Progress') {
      let updatedTasks = [...state.inProgress.items].filter(
        (task) => task.id !== id,
      );
      setTasks(updatedTasks);
      setState((prev) => {
        return {
          ...prev,
          inProgress: {
            title: title,
            items: updatedTasks,
          },
        };
      });
    }
    if (title === 'Completed') {
      let updatedTasks = [...state.done.items].filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setState((prev) => {
        return {
          ...prev,
          done: {
            title: title,
            items: updatedTasks,
          },
        };
      });
    }
  };

  //Edit title
  const submitTitleEdits = (id, listTitle) => {
    if (listTitle === 'To Do') {
      const updatedTasks = [...state.todo.items].map((task) => {
        if (task.id === id) {
          if (editingTitle.trim().length !== 0) {
            task.title = editingTitle;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingTitle(null);
      setState((prev) => {
        return {
          ...prev,
          todo: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'In Progress') {
      const updatedTasks = [...state.inProgress.items].map((task) => {
        if (task.id === id) {
          if (editingTitle.trim().length !== 0) {
            task.title = editingTitle;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingTitle(null);
      setState((prev) => {
        return {
          ...prev,
          inProgress: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'Completed') {
      const updatedTasks = [...state.done.items].map((task) => {
        if (task.id === id) {
          if (editingTitle.trim().length !== 0) {
            task.title = editingTitle;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingTitle(null);
      setState((prev) => {
        return {
          ...prev,
          done: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
  };

  //Edit description

  const submitDescriptionEdits = (id, listTitle) => {
    if (listTitle === 'To Do') {
      const updatedTasks = [...state.todo.items].map((task) => {
        if (task.id === id) {
          if (editingDescription.trim().length !== 0) {
            task.description = editingDescription;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingDescription(null);
      setState((prev) => {
        return {
          ...prev,
          todo: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'In Progress') {
      const updatedTasks = [...state.inProgress.items].map((task) => {
        if (task.id === id) {
          if (editingDescription.trim().length !== 0) {
            task.description = editingDescription;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingDescription(null);
      setState((prev) => {
        return {
          ...prev,
          inProgress: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
    if (listTitle === 'Completed') {
      const updatedTasks = [...state.done.items].map((task) => {
        if (task.id === id) {
          if (editingDescription.trim().length !== 0) {
            task.description = editingDescription;
          }
        }
        return task;
      });
      setTasks(updatedTasks);
      setIsEditingDescription(null);
      setState((prev) => {
        return {
          ...prev,
          done: {
            title: listTitle,
            items: updatedTasks,
          },
        };
      });
    }
  };

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

  let completionRatio = 0;
  let numberOfCompletedTasks = state.done.items.length;
  let totalNumberOfTasks = 0;

  _.map(state, (data) => (totalNumberOfTasks += data.items.length));

  completionRatio = Math.floor(
    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  );

  const completionRatioText = (completionRatio) => {
    if (completionRatio > 0 && completionRatio < 25) {
      return t('There you go!');
    }
    if (completionRatio >= 25 && completionRatio < 50) {
      return t('Nice!');
    }
    if (completionRatio === 50) {
      return t('Halfway through!');
    }
    if (completionRatio > 50 && completionRatio < 75) {
      return t('More than halfway through!');
    }
    if (completionRatio >= 75 && completionRatio < 100) {
      return t('Almost done!');
    }
    if (completionRatio == 100) {
      return t('Done!');
    }
  };

  return (
    <div class="row">
      <div class="column" className="members-column">
        <Students />
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
                                    //console.log(snapshot)
                                    //console.log(task)
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
          progress={completionRatio ? completionRatio : 0}
          height={20}
          numberOfCompletedTasks={numberOfCompletedTasks}
          totalNumberOfTasks={totalNumberOfTasks}
          completionRatio={completionRatio}
          completionRatioText={completionRatioText}
        />
      </div>
    </div>
  );
};

export default App;

// no items text color: #c1c3c4;

// max width 600
// .text-input {
//   border: #f54f1c 1px solid;
//   outline: none;
//   border-radius: 25px;
//   width: 200px;
//   font-size: 16px;
//   padding: 8px 12px;
//   margin: auto 8px;
//   font-weight: bold;
// }

// .text-input-out {
//   border: #b8ced1 1px solid;
//   box-shadow: 0 0 7px #b8ced1;
//   outline: none;
//   border-radius: 25px;
//   width: 200px;
//   font-size: 16px;
//   padding: 8px 12px;
//   margin: auto 8px;
//   font-weight: bold;
// }

// .list-item {
//   border: none;
//   border-radius: 25px;
//   width: 290px;
//   font-size: 18px;
//   padding: 4px 15px;
//   margin: 10px 0;
//   margin-left: 10px;
//   color: #131a28;
//   font-weight: bold;
//   text-align: start;
//   align-items: center;
// }
// .list-item-out {
//   border-color: #8ea3b4;
//   box-shadow: 0 0 10px #8ea3b4;
//   border-radius: 25px;
//   width: 290px;
//   font-size: 18px;
//   padding: 4px 15px;
//   margin: 10px 0;
//   margin-left: 10px;
//   color: #131a28;
//   font-weight: bold;
//   text-align: start;
//   align-items: center;
// }
