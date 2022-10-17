import React, { useContext, FC, ReactElement } from 'react';
import '../index.css';
import { RecordOf } from 'immutable';
import { useTheme } from '@mui/material/styles';
import { Context, LocalContext } from '@graasp/apps-query-client';
import { DEFAULT_PERMISSION, PERMISSION_LEVELS } from '../config/settings';
import TasksManager from './views/TasksManager';
import { MembersProvider } from './context/MembersContext';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';

const App: FC = () => {
  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context: RecordOf<LocalContext> = useContext(Context);

  const theme = useTheme();

  const permissionLevel: string =
    context?.get('permission', DEFAULT_PERMISSION) || DEFAULT_PERMISSION;

  const renderContent = (): ReactElement => (
    <div className="row">
      {/* <div className="App" style={{ paddingLeft: '17em' }}> */}
      <div className="App" style={{ paddingLeft: theme.spacing(1) }}>
        <TasksManager />
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
