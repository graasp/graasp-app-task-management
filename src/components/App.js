import React, { useContext, useState, useEffect } from 'react';
import '../index.css';
// eslint-disable-next-line camelcase
import { List } from 'immutable';
import { useTheme } from '@mui/material/styles';
import { MUTATION_KEYS, useMutation } from '../config/queryClient';
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { useAppData, useAppContext } from './context/appData';
import { Context } from './context/ContextContext';
import { DEFAULT_PERMISSION, PERMISSION_LEVELS } from '../config/settings';
import { ACTION_TYPES } from '../config/actionTypes';
import Settings from './main/Settings';
import TasksManager from './views/TasksManager';
import { COLORS } from '../constants/constants';

const App = () => {
  const { mutate: postAppData } = useMutation(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);
  const { mutate: deleteAppData } = useMutation(MUTATION_KEYS.DELETE_APP_DATA);

  const theme = useTheme();

  const [tasks, setTasks] = useState(List());
  const [toggle, setToggle] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const context = useContext(Context);

  const permissionLevel = context?.get('permission', DEFAULT_PERMISSION);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isLoading: isAppDataLoading,
  } = useAppData();

  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      const membersTmp = appContext?.get('members').map((member, index) => ({
        ...member,
        color: COLORS[index],
      }));
      setMembers(membersTmp);
    }
  }, [appContext, isAppContextSuccess]);

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

  return (
    <div className="row">
      {/* <div className="App" style={{ paddingLeft: '17em' }}> */}
      <div className="App" style={{ paddingLeft: theme.spacing(1) }}>
        <TasksManager
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          members={members}
        />
      </div>

      {/* <Footer
        numberOfCompletedTasks={completedTasks}
        totalNumberOfTasks={totalNumberOfTasks}
        setToggle={setToggle}
        toggle={toggle}
        contributions={contributions}
        tasks={tasks}
        isChecked={isChecked}
      /> */}

      {[PERMISSION_LEVELS.WRITE, PERMISSION_LEVELS.ADMIN].includes(
        permissionLevel,
      ) && (
        <Settings
          setToggle={setToggle}
          toggle={toggle}
          members={members}
          filteredNames={filteredNames}
          setFilteredNames={setFilteredNames}
        />
      )}
    </div>
  );
};

export default App;
