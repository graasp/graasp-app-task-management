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

  const contributionMap = new Map();

  students.map((student) => contributionMap.set(student.name, 0));
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
        contribution: (contribution / totalNumberOfTasks) * 100,
        flooredContribution: Math.floor(
          (contribution / totalNumberOfTasks) * 100,
        ),
        color: availableColors[index % availableColors.length],
      };
    },
  );

  return (
    <div className="row">

        {!toggle ? (
          <div className="members-column column">
              <Students
                students={students}
                setStudents={setStudents}
                contributions={contributions}
              />
          </div>
        ) : (
          ' '
        )}
        <div className="App column" style={{ paddingLeft: '13em' }}>
          {!toggle ? (
            // <div className="row" style={{ paddingLeft: '13em' }}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Grid container>
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
            // </div>
          ) : (
            <div className="row" style={{ paddingLeft: '13em' }}>
              <ChartsArea
                tasks={tasks}
                students={students}
                completedTasks={completedTasks}
                totalNumberOfTasks={totalNumberOfTasks}
                contributions={contributions}
              />
            </div>
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
        />

        {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
          permissionLevel,
        ) && <Settings setToggle={setToggle} toggle={toggle} tasks={tasks} />}
    </div>
  );
};

export default App;
