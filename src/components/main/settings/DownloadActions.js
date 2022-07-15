import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@graasp/ui';
import { saveAs } from 'file-saver';
import { useAppActions, useAppSettings } from '../../context/appData';
import { showErrorToast } from '../../../utils/toasts';
import { Context } from '../../context/ContextContext';
import { APP_SETTINGS } from '../../../constants/constants';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: '1.05vw',
  },
}));

const DEFAULT_PROGRESS_BAR_DISPLAY_SETTING = {
  name: APP_SETTINGS.PROGRESS_BAR_DISPLAY,
  data: {
    showUserShare: false,
  },
};

// eslint-disable-next-line react/prop-types
const DownloadActions = ({ members }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [actions, setActions] = useState([]);

  const [enableDownload, setEnableDownload] = useState(false);

  const context = useContext(Context);

  const [progressBarDisplaySetting, setProgressBarDisplaySetting] = useState();

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (!isSuccess) {
      const s =
        appSettings?.find(
          ({ name }) => name === APP_SETTINGS.PROGRESS_BAR_DISPLAY,
        ) || DEFAULT_PROGRESS_BAR_DISPLAY_SETTING;
      setProgressBarDisplaySetting(s);
    }
  }, [appSettings, isSuccess]);

  const {
    data: appActions,
    isSuccess: isAppActionsSuccess,
    isError: isAppActionsError,
  } = useAppActions();

  useEffect(() => {
    if (isAppActionsError) {
      showErrorToast(t('The app actions could not be loaded.'));
      setEnableDownload(false);
      return;
    }
    if (isAppActionsSuccess && !appActions?.isEmpty()) {
      setActions(appActions);
      setEnableDownload(true);
    }
  }, [appActions, isAppActionsSuccess, isAppActionsError]);

  const handleDownload = () => {
    const datetime = new Date().toJSON();

    const status = progressBarDisplaySetting.data;
    const blob = new Blob(
      [
        JSON.stringify({
          context: {
            ...Object.fromEntries(context),
            datetime,
          },
          actions,
          members,
          status,
        }),
      ],
      {
        type: 'text/json;charset=utf-8',
      },
    );
    const filename = `app_actions_${datetime}.json`;
    saveAs(blob, filename);
  };

  return (
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
        {t('Download learning analytics.')}
      </Typography>
      <FormControlLabel
        control={
          <Button
            disabled={!enableDownload}
            variant="contained"
            color="secondary"
            onClick={handleDownload}
          >
            {t('Download')}
          </Button>
        }
      />
    </div>
  );
};

export default DownloadActions;
