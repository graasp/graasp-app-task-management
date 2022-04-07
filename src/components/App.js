/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData } from './context/appData';
import Students from './main/Students';
import Footer from './main/Footer';
import TasksList from './main/TasksList';
import { TASK_LABELS } from '../config/settings';

const App = () => {
  // const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);
  const [tasks, setTasks] = useState([]);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    // isStale: isAppDataStale,
    isLoading: isAppDataLoading,
  } = useAppData();

  useEffect(() => {
    if (isAppDataSuccess && !isAppDataLoading) {
      const newTasks = appData.filter(
        ({ type }) => type === APP_DATA_TYPES.TASK,
      );
      if (newTasks) {
        setTasks(newTasks);
      }
    }
  }, [appData, isAppDataSuccess, isAppDataLoading]);

  const addTask = (newTask) => {
    postAppData(newTask);
  };

  const updateTask = (newTask) => {
    patchAppData(newTask);
  };

  const deleteTask = (id) => {
    deleteAppData({id});
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

    const labelledTasks = [...tasks.filter(({ data }) => data.label === source.droppableId)];

    console.debug("The relevant tasks are:", labelledTasks);

    const draggedTask = labelledTasks[source.index];

    console.debug("Destination: ", destination);
    console.debug("Source: ", source);

    const newTask = {
      ...draggedTask,
      data: {
        ...draggedTask.data,
        label: destination.droppableId,
      },
    };

    console.debug("Newtask: ", newTask);

    updateTask(newTask);
  };

  const totalNumberOfTasks = tasks.length;

  const renderTasksList = (title, label, add = false) => {
    const tasksArray = [...tasks.filter(({ data }) => data.label === label)];
    console.debug("The tasks in ", label, " are: ", tasksArray);
    return (
      <TasksList
        title={title}
        label={label}
        tasks={tasksArray}
        addComponent={add}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
  )};

  return (
    <div className="row">
      <div className="members-column column">
        <Students tasks={tasks} setTasks={setTasks} />
      </div>
      <div className="App column">
        <div className="row">
          <DragDropContext onDragEnd={handleDragEnd}>
            {renderTasksList('To Do', TASK_LABELS.TODO, true)}
            {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
            {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
          </DragDropContext>
        </div>
        <div className="clear" />
      </div>
      <Footer
        numberOfCompletedTasks={7}
        totalNumberOfTasks={totalNumberOfTasks}
      />
    </div>
  );
};

export default App;
