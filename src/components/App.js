/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import '../index.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData } from './context/appData';
import { Context } from './context/ContextContext';
import Students from './main/Students';
import Footer from './main/Footer';
import TasksList from './main/TasksList';
// import Demo from './main/Demo';
import {
  TASK_LABELS,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../config/settings';
import { ACTION_TYPES } from '../config/actionTypes';
import Settings from './main/Settings';
import ChartsArea from './main/ChartsArea';

let completedTasks = 0;

const App = () => {
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);

  const [tasks, setTasks] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [students, setStudents] = useState([]);

  const context = useContext(Context);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

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
    postAction({
      type: ACTION_TYPES.ADD,
      data: {
        ...newTask.data,
        id: newTask.id,
      },
    });
  };

  const updateTask = (newTask) => {
    patchAppData(newTask);
    postAction({
      type: ACTION_TYPES.EDIT,
      data: {
        ...newTask.data,
        id: newTask.id,
      },
    });
  };

  const deleteTask = (id) => {
    deleteAppData({ id });
    postAction({
      type: ACTION_TYPES.DELETE,
      data: {
        id,
      },
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

    const labelledTasks = [
      ...tasks.filter(({ data }) => data.label === source.droppableId),
    ];

    // console.debug('The relevant tasks are:', labelledTasks);

    const draggedTask = labelledTasks[source.index];

    // console.debug('Destination: ', destination);
    // console.debug('Source: ', source);

    const newTask = {
      ...draggedTask,
      data: {
        ...draggedTask.data,
        label: destination.droppableId,
      },
    };

    // console.debug('Newtask: ', newTask);

    updateTask(newTask);
  };

  const totalNumberOfTasks = tasks.size;

  const renderTasksList = (title, label, add = false) => {
    const tasksArray = [...tasks.filter(({ data }) => data.label === label)];

    const completedTasksArray = [
      tasks.filter(({ data }) => data.label === 'completed'),
    ];

    completedTasks = completedTasksArray[0].size;

    // console.debug('The tasks in ', label, ' are: ', tasksArray);
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
          // eslint-disable-next-line no-use-before-define
          contributions={contributions}
        />
      </div>
    );
  };
  const names = [
    'Graciana Aad',
    'Denis Gillet',
    'Jérémy La Scala',
    'Kimiya Behbahani Zadeh',
    'Zoubida Squalli Houssaini',
    'Margot Romelli',
  ];
  const isChecked = (name) => {
    if (names.includes(name)) {
      return false;
    }
    return true;
  };

  const contributionMap = new Map();

  students.map((student) =>
    isChecked(student.name) ? contributionMap.set(student.name, 0) : null,
  );

  const incrementCount = (label, arr, member) => {
    if (label === 'completed') {
      if (arr.includes(member.name)) {
        contributionMap.set(
          member.name,
          contributionMap.get(member.name) + 1 / arr.length,
        );
      }
    }
  };
  for (const student of students) {
    if (tasks._tail) {
      tasks._tail.array.forEach((task) => {
        incrementCount(task.data.label, task.data.members, student);
      });
    }
  }

  const availableColors = [
    '#CAF0F6',
    '#FFDFD3',
    '#B6EECF',
    '#E0BBE4',
    '#A5D6EA',
    '#D7ECD9',
    '#B4C6DD',
    '#AE88F9',
    '#DDF1FF',
    '#D3EAFF',
  ];
  const contributions = Array.from(
    contributionMap,
    // eslint-disable-next-line arrow-body-style
    ([key, contribution], index) => {
      return {
        name: key,
        contribution:
          totalNumberOfTasks === 0
            ? 0
            : (contribution / totalNumberOfTasks) * 100,
        memberContribution:
          totalNumberOfTasks === 0
            ? 0
            : Math.floor((contribution / totalNumberOfTasks) * 100),
        color: availableColors[index % availableColors.length],
      };
    },
  );

  return (
    <div className="row">
      {!toggle ? (
        <div className="members-column column">
          <Students
            setStudents={setStudents}
            contributions={contributions}
            isChecked={isChecked}
          />
        </div>
      ) : (
        ' '
      )}
      <div className="App" style={{ paddingLeft: '17em' }}>
        {!toggle ? (
          // <div className="row" style={{ paddingLeft: '13em' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {/* {renderTasksList('To Do', TASK_LABELS.TODO, true)}
            {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
            {renderTasksList('Completed', TASK_LABELS.COMPLETED)} */}

            <Grid container columnSpacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                {renderTasksList('To Do', TASK_LABELS.TODO, true)}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
              </Grid>
            </Grid>
          </DragDropContext>
        ) : (
          <ChartsArea
            tasks={tasks}
            students={students}
            completedTasks={completedTasks}
            totalNumberOfTasks={totalNumberOfTasks}
            contributions={contributions}
          />
        )}
        <div className="clear" />
      </div>

      <Footer
        numberOfCompletedTasks={completedTasks}
        totalNumberOfTasks={totalNumberOfTasks}
        setToggle={setToggle}
        toggle={toggle}
        contributions={contributions}
        tasks={tasks}
        isChecked={isChecked}
      />

      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && <Settings setToggle={setToggle} toggle={toggle} tasks={tasks} members={contributions} />}
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

// @media only screen and (max-width: 2600px) and (min-width: 1500px) {
//   .droppable-col {
//     width: 27em;
//     background-color: #ebecf0;
//     border-radius: 1.5625em;
//     display: flex;
//     flex-direction: column;
//     min-height: 50vh;
//     min-width: 50vh;
//     text-align: center;
//     color: white;
//     justify-content: flex-start;
//     align-items: center;
//     padding: 1.875em 1.25em;
//     margin-left: 3em;
//     margin-right: 3em;
//   }

//   .app-background {
//     display: flex;
//     min-height: 100vh;
//     flex-direction: column;
//     text-align: center;
//     color: white;
//     justify-content: flex-start;
//     align-items: center;
//   }
//   .row {
//     display: flex;
//     flex-direction: row;
//   }

//   .column {
//     display: flex;
//     flex-direction: column;
//   }

//   .jc-space-between {
//     justify-content: space-between;
//   }

//   .text-task {
//     color: black;
//     font-weight: 500;
//   }
//   .text-task:hover {
//     font-weight: 700;
//   }

//   .add-button {
//     outline: none;
//     border: none;
//     color: #201328;
//     font-size: 1.0625em;
//     font-weight: bolder;
//     padding: 10px 0.9375em;
//     border-radius: 0.5em;
//     text-align: center;
//     margin: 0 0.9375em 0.9375em 0.9375em;
//     cursor: pointer;
//   }

//   .text-input {
//     border: #c3c9ca 1px solid;
//     outline: none;
//     border-radius: 1.5625em;
//     width: 17em;
//     font-size: 1.125em;
//     padding: 10px 0.9375em;
//     margin: 0 0.9375em 0.9375em 0.9375em;
//     font-weight: bold;
//     font-weight: 500;
//   }
//   .text-input-out {
//     border: #c3c9ca 1px solid;
//     box-shadow: 0 0 0.4375em #c3c9ca;
//     outline: none;
//     border-radius: 1.5625em;
//     width: 17em;
//     font-size: 1.125em;
//     padding: 10px 0.9375em;
//     margin: 0 0.9375em 0.9375em 0.9375em;
//     font-weight: bold;
//     font-weight: 500;
//   }

//   .list-item {
//     background-color: white;
//     border: none;
//     border-radius: 1.5625em;
//     width: 22em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 10px 0;
//     color: black;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//     height: 2em;
//   }

//   .list-item:hover {
//     border-color: #8ea3b4;
//     box-shadow: 0 0 0.625em #8ea3b4;
//   }

//   .list-item-out {
//     background-color: white;
//     border-color: #8ea3b4;
//     box-shadow: 0 0 0.625em #8ea3b4;
//     border-radius: 1.5625em;
//     width: 22em;
//     font-size: 1.125em;
//     padding: 0.625em 0.9375em;
//     margin: 0.625em 0;
//     color: black;
//     font-weight: bold;
//     text-align: start;
//     align-items: center;
//     height: 2em;
//   }
// }
