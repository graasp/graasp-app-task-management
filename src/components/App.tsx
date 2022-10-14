import React, {
  useContext,
  useState,
  useEffect,
  FC,
  ReactElement,
} from 'react';
import '../index.css';
// eslint-disable-next-line camelcase
import { List, RecordOf } from 'immutable';
import { useTheme } from '@mui/material/styles';
import { Context, LocalContext } from '@graasp/apps-query-client';
import {
  APP_DATA_TYPES,
  ExistingTaskType,
  TaskType,
} from '../config/appDataTypes';
import { DEFAULT_PERMISSION, PERMISSION_LEVELS } from '../config/settings';
import { ACTION_TYPES } from '../config/actionTypes';
import Settings from './main/Settings';
import TasksManager from './views/TasksManager';
import { COLORS } from '../constants/constants';
import { MembersProvider, useMembersContext } from './context/MembersContext';
import { AppDataProvider, useAppDataContext } from './context/AppDataContext';
import { useAppActionContext } from './context/AppActionContext';
import { AppSettingProvider } from './context/AppSettingContext';

const App: FC = () => {
  // get the appData array and a callback to post new appData
  const { postAppData, patchAppData, deleteAppData, appDataArray } =
    useAppDataContext();

  const { postAppAction } = useAppActionContext();

  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context: RecordOf<LocalContext> = useContext(Context);

  const theme = useTheme();

  const [tasks, setTasks] = useState<List<ExistingTaskType>>(List());
  const [toggle, setToggle] = useState(false);
  const [filteredNames, setFilteredNames] = useState([]);

  // get the members having access to the space
  const members = useMembersContext();

  const permissionLevel: string =
    context?.get('permission', DEFAULT_PERMISSION) || DEFAULT_PERMISSION;

  // useEffect(() => {
  //   if (isAppContextSuccess) {
  //     const membersTmp = appContext?.get('members').map((member, index) => ({
  //       ...member,
  //       color: COLORS[index],
  //     }));
  //     setMembers(membersTmp);
  //   }
  // }, [appContext, isAppContextSuccess]);

  useEffect(() => {
    const newTasks = appDataArray.filter(
      ({ type }) => type === APP_DATA_TYPES.TASK,
    );
    if (newTasks) {
      setTasks(newTasks);
    }
  }, [appDataArray]);

  const addTask = (newTask: TaskType) => {
    postAppData(newTask);

    postAppAction({
      type: ACTION_TYPES.ADD,
      data: {
        ...newTask.data,
      },
    });
  };

  const updateTask = (newTask: ExistingTaskType) => {
    patchAppData(newTask);
    postAppAction({
      type: ACTION_TYPES.EDIT,
      data: {
        ...newTask.data,
        id: newTask.id,
      },
    });
  };

  const deleteTask = (id: string) => {
    deleteAppData({ id });
    postAppAction({
      type: ACTION_TYPES.DELETE,
      data: {
        id,
      },
    });
  };

  const renderContent = (): ReactElement => (
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
        // <Settings
        //   setToggle={setToggle}
        //   toggle={toggle}
        //   members={members}
        //   filteredNames={filteredNames}
        //   setFilteredNames={setFilteredNames}
        // />
        <p>Settings</p>
      )}
    </div>
  );

  return (
    <MembersProvider>
      <AppDataProvider>
        <AppSettingProvider>{renderContent()}</AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};

export default App;
