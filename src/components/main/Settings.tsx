import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SettingsIcon from '@mui/icons-material/Settings';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';

import { useAppSettingContext } from '../context/AppSettingContext';
import { useMembersContext } from '../context/MembersContext';
import FilterMembers from './settings/FilterMembers';

const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (): void => {
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const members = useMembersContext();
  const {
    appSettingArray: settings,
    postAppSetting,
    patchAppSetting,
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
        <Dialog fullWidth open={modalOpen} onClose={handleModalClose}>
          <DialogTitle>{t('Settings')}</DialogTitle>

          <DialogContent dividers>
            <Stack>
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
