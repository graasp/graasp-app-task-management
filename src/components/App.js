/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData } from './context/appData';
import { Context } from './context/ContextContext';
import Students from './main/Students';
import MyProgress from './main/MyProgress';
import MembersProgress from './main/MembersProgress';
import TasksList from './main/TasksList';
import {
  TASK_LABELS,
  DEFAULT_PERMISSION,
  PERMISSION_LEVELS,
} from '../config/settings';
import { ACTION_TYPES } from '../config/actionTypes';
import ProgressPanel from './main/ProgressPanel';
import Settings from './main/Settings';

let completedTasks = 0;

const useStyles = makeStyles(() => ({
  headerText: {
    fontSize: '1.05vw',
  },
}));

const App = () => {
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);

  const classes = useStyles();
  const { t } = useTranslation();

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
        note: newTask.data,
        id: newTask.id,
      },
    });
  };

  const updateTask = (newTask) => {
    patchAppData(newTask);
    postAction({
      type: ACTION_TYPES.EDIT,
      data: {
        note: newTask.data,
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

  return (
    <div className="row">
      {!toggle ? (
        <div className="members-column column">
          <Students
            tasks={tasks}
            setTasks={setTasks}
            students={students}
            setStudents={setStudents}
          />
        </div>
      ) : (
        ' '
      )}
      <div className="App column">
        {!toggle ? (
          <div className="row" style={{ paddingLeft: '13em' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              {renderTasksList('To Do', TASK_LABELS.TODO, true)}
              {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
              {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
            </DragDropContext>
          </div>
        ) : (
          <div className="row" style={{ paddingLeft: '13em' }}>
            <Typography className={classes.headerText}>
              {t(`Group's Progress`)}
            </Typography>
            <ProgressPanel
              completedTasks={completedTasks}
              totalNumberOfTasks={totalNumberOfTasks}
            />
            <Typography className={classes.headerText}>
              {t('Your Contribution')}
            </Typography>
            <MyProgress
              tasks={tasks}
              students={students}
              completedTasks={completedTasks}
              totalNumberOfTasks={totalNumberOfTasks}
            />
            <Typography className={classes.headerText}>
              {t(`Each Member's Contribution`)}
            </Typography>
            <MembersProgress
              tasks={tasks}
              students={students}
              completedTasks={completedTasks}
              totalNumberOfTasks={totalNumberOfTasks}
            />
          </div>
        )}
        <div className="clear" />
      </div>
      {/* <Footer
        numberOfCompletedTasks={completedTasks}
        totalNumberOfTasks={totalNumberOfTasks}
      />  */}

      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && <Settings setToggle={setToggle} toggle={toggle} tasks={tasks} />}
    </div>
  );
};

export default App;
