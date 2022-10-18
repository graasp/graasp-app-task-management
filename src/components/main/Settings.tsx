import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { Member } from '@graasp/apps-query-client';
import { List } from 'immutable';
import FilterMembers from './settings/FilterMembers';
import { useMembersContext } from '../context/MembersContext';
import { useAppSettingContext } from '../context/AppSettingContext';

// eslint-disable-next-line no-unused-vars
const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (): void => {
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const members: List<Member> = useMembersContext();
  const {
    appSettingArray: settings,
    postAppSetting,
    patchAppSetting,
    // deleteAppSetting,
  } = useAppSettingContext();

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div onClick={(event) => event.stopPropagation()}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            mb: 1,
            mr: 1,
            bottom: 2,
            right: 2,
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleModalOpen();
          }}
        >
          <SettingsIcon />
        </Fab>
        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogTitle>{t('Settings')}</DialogTitle>

          <DialogContent>
            <Stack>
              {/* <DownloadActions members={members} /> */}
              {/* <SettingsProgressBar /> */}

              {/* <Data handleModalClose={handleModalClose} tasks={tasks} /> */}
              <FilterMembers
                members={members}
                postAppSetting={postAppSetting}
                patchAppSetting={patchAppSetting}
                settings={settings}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
            >
              {t('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Settings;
