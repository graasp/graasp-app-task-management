import { RecordOf } from 'immutable';

import React, { FC, ReactElement, useContext, useEffect } from 'react';

import { Context, LocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { useTheme } from '@mui/material/styles';

import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import { DEFAULT_PERMISSION } from '../config/settings';
import '../index.css';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';
import Settings from './main/Settings';
import TasksManager from './views/TasksManager';

const App: FC = () => {
  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context: RecordOf<LocalContext> = useContext(Context);

  const theme = useTheme();

  const permissionLevel =
    (context?.get('permission', DEFAULT_PERMISSION) as PermissionLevel) ||
    DEFAULT_PERMISSION;

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_CONTEXT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): ReactElement => (
    <div className="row">
      <div className="App" style={{ paddingLeft: theme.spacing(1) }}>
        <TasksManager />
      </div>

      {[PermissionLevel.Write, PermissionLevel.Admin].includes(
        permissionLevel,
      ) && <Settings />}
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
