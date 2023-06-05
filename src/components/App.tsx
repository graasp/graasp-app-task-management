import { FC, ReactElement, useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { useTheme } from '@mui/material/styles';

import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import { MAIN_CONTAINER_CY } from '../config/selectors';
import { DEFAULT_PERMISSION } from '../config/settings';
import '../index.css';
import FullDiv from './common/FullDiv';
import PublicAlert from './common/PublicAlert';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';
import Settings from './main/Settings';
import TasksManager from './views/TasksManager';

const App: FC = () => {
  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context = useLocalContext();

  const theme = useTheme();

  const permissionLevel = context?.permission || DEFAULT_PERMISSION;

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_CONTEXT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): ReactElement => (
    <FullDiv data-cy={MAIN_CONTAINER_CY}>
      <FullDiv className="App" style={{ paddingLeft: theme.spacing(1) }}>
        <TasksManager />
      </FullDiv>

      {[PermissionLevel.Write, PermissionLevel.Admin].includes(
        permissionLevel,
      ) && <Settings />}
    </FullDiv>
  );

  return (
    <MembersProvider>
      <AppDataProvider>
        <PublicAlert />
        <AppSettingProvider>{renderContent()}</AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};

export default App;
