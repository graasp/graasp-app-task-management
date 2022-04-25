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

let completedTasks = 0;
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
    deleteAppData({ id });
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

    const labelledTasks = [
      ...tasks.filter(({ data }) => data.label === source.droppableId),
    ];

    console.debug('The relevant tasks are:', labelledTasks);

    const draggedTask = labelledTasks[source.index];

    console.debug('Destination: ', destination);
    console.debug('Source: ', source);

    const newTask = {
      ...draggedTask,
      data: {
        ...draggedTask.data,
        label: destination.droppableId,
      },
    };

    console.debug('Newtask: ', newTask);

    updateTask(newTask);
  };

  const totalNumberOfTasks = tasks.size;

  const renderTasksList = (title, label, add = false) => {
    const tasksArray = [...tasks.filter(({ data }) => data.label === label)];

    const completedTasksArray = [
      tasks.filter(({ data }) => data.label === 'completed'),
    ];
    completedTasks = completedTasksArray[0].size;

    console.debug('The tasks in ', label, ' are: ', tasksArray);
    return (
      <div>
        <TasksList
          title={title}
          label={label}
          tasks={tasksArray}
          addComponent={add}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    );
  };

  return (
    <div className="row">
      <div className="members-column column">
        <Students tasks={tasks} setTasks={setTasks} />
      </div>
      <div className="App column">
        <div className="row" style={{ paddingLeft:'13em' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {renderTasksList('To Do', TASK_LABELS.TODO, true)}
            {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
            {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
          </DragDropContext>
        </div>
        <div className="clear" />
      </div>
      <Footer
        numberOfCompletedTasks={completedTasks}
        totalNumberOfTasks={totalNumberOfTasks}
      />
    </div>
  );
};

export default App;



// @media only screen and (max-width: 600px) {
//   .delete-icon {
//     height: 1.125em;
//   }
//   .droppable-col {
//     width: 22em;
//     background-color: #ebecf0;
//     border-radius: 1.5625em;
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     color: white;
//     min-height: 50vh;
//     min-width: 10vh;
//     justify-content: flex-start;
//     align-items: center;
//     padding: 30px 20px;
//     margin-left: 20px;
//     margin-right: 50px;
//   }
//   .text-input {
//     outline: none;
//     border-radius: 1.5625em;
//     width: 13em;
//     font-size: 1em;
//     padding: 0.em 0.75em;
//     margin: auto 0.5em;
//     font-weight: bold;
//   }

//   .text-input-out {
//     border: #b8ced1 1px solid;
//     box-shadow: 0 0 0.4375em #b8ced1;
//     outline: none;
//     border-radius: 1.5625em;
//     width: 13em;
//     font-size: 1em;
//     padding: 0.5em 0.75em;
//     margin: auto 0.5em;

//     font-weight: bold;
//   }

//   .list-item {
//     border: none;
//     border-radius: 1.5625em;
//     width: 17em;
//     height: 1.5625em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 0.em 0;
//     color: #131a28;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//   }
//   .list-item-out {
//     border-color: #8ea3b4;
//     box-shadow: 0 0 0.625em #8ea3b4;
//     border-radius: 1.5625em;
//     width: 17em;
//     height: 1.5625em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 0.625em 0;
//     color: #131a28;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//   }
  
// }

// @media only screen and (max-width: 600px) and (max-height: 600px){
//   .delete-icon {
//     height: 1.125em;
//   }
//   .droppable-col {
//     width: 22em;
//     background-color: #ebecf0;
//     border-radius: 1.5625em;
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     color: white;
//     min-height: 50vh;
//     min-width: 10vh;
//     justify-content: flex-start;
//     align-items: center;
//     padding: 30px 20px;
//     margin-left: 3em;
//     margin-right: 3em;
//   }
//   .text-input {
//     outline: none;
//     border-radius: 1.5625em;
//     width: 13em;
//     font-size: 1em;
//     padding: 0.em 0.75em;
//     margin: auto 0.5em;
//     font-weight: bold;
//   }

//   .text-input-out {
//     border: #b8ced1 1px solid;
//     box-shadow: 0 0 0.4375em #b8ced1;
//     outline: none;
//     border-radius: 1.5625em;
//     width: 13em;
//     font-size: 1em;
//     padding: 0.5em 0.75em;
//     margin: auto 0.5em;

//     font-weight: bold;
//   }

//   .list-item {
//     border: none;
//     border-radius: 1.5625em;
//     width: 17em;
//     height: 1.5625em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 0.em 0;
//     color: #131a28;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//   }
//   .list-item-out {
//     border-color: #8ea3b4;
//     box-shadow: 0 0 0.625em #8ea3b4;
//     border-radius: 1.5625em;
//     width: 17em;
//     height: 1.5625em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 0.625em 0;
//     color: #131a28;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//   }
  
// }

