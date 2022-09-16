/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-cond-assign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
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
  const [filteredNames, setFilteredNames] = useState([]);

  const context = useContext(Context);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);
  const keyword_extractor = require('keyword-extractor');

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
      // const filteredMembers = appData.filter(
      //   ({ type }) => type === APP_DATA_TYPES.FILTERED_MEMBERS,
      // );
      // if (filteredMembers) {
      //   setFilteredNames(filteredMembers);
      // } else {
      //   postAppData({
      //     type: 'filtered_members',
      //     data: { names: filteredNames },
      //   });
      // }
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

  const totalNumberOfTasks = tasks.size ? tasks.size : 0;

  const renderTasksList = (title, label, add = false) => {
    const tasksArray = [...tasks.filter(({ data }) => data.label === label)];

    const completedTasksArray = [
      tasks.filter(({ data }) => data.label === 'completed'),
    ];

    completedTasks = completedTasksArray[0].size
      ? completedTasksArray[0].size
      : 0;

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

  const isChecked = (name) => {
    if (filteredNames.includes(name)) {
      return false;
    }
    return true;
  };
  const contributionMap = new Map();

  students.map((student) =>
    isChecked(student.name) ? contributionMap.set(student.name, 0) : null,
  );

  const sentences = [];
  let sentence = '';
  if (tasks.length !== 0) {
    if (tasks._tail) {
      tasks._tail.array.map((task) => sentences.push(task.data.title));
      tasks._tail.array.map((task) => sentences.push(task.data.description));
      sentence = sentences.join(' ');
    }
  }

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
  const result = keyword_extractor.extract(sentence, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  const extraction = result.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const extraction_result = extraction.slice(0, 10);

  const commonWords = [
    'i',
    'a',
    'about',
    'an',
    'and',
    'are',
    'as',
    'at',
    'be',
    'by',
    'com',
    'de',
    'en',
    'for',
    'from',
    'how',
    'in',
    'is',
    'it',
    'la',
    'of',
    'on',
    'or',
    'that',
    'the',
    'this',
    'to',
    'was',
    'what',
    'when',
    'where',
    'who',
    'will',
    'with',
    'und',
    'the',
    'www',
  ];

  // Convert to lowercase
  sentence = sentence.toLowerCase();

  // replace unnesessary chars. leave only chars, numbers and space
  sentence = sentence.replace(/[^\w\d ]/g, '');

  let result1 = sentence.split(' ');

  // remove $commonWords
  result1 = result.filter((word) => commonWords.indexOf(word) === -1);

  // Unique words
  result1 = [...new Set(result1)];

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
              <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                {renderTasksList('To Do', TASK_LABELS.TODO, true)}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
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
            extraction_result={extraction_result}
            sentence={sentence}
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
      ) && (
        <Settings
          setToggle={setToggle}
          toggle={toggle}
          members={contributions}
          students={contributions}
          filteredNames={filteredNames}
          setFilteredNames={setFilteredNames}
        />
      )}
    </div>
  );
};

export default App;
