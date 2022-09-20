import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@graasp/ui';
import { MUTATION_KEYS, useMutation } from '../../../config/queryClient';
import { APP_SETTINGS } from '../../../constants/constants';
import { useAppSettings } from '../../context/appData';


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
  headerDisabled: {
    color: 'grey',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const DEFAULT_PROGRESS_BAR_DISPLAY_SETTING = {
  name: APP_SETTINGS.PROGRESS_BAR_DISPLAY,
  data: {
    showUserShare: false,
  },
};

const SettingsProgressBar = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING,
  );

  const [progressBarDisplaySetting, setProgressBarDisplaySetting] = useState();

  const { data: appSettings, isSuccess } = useAppSettings();

  useEffect(() => {
    if (isSuccess) {
      const s =
        appSettings?.find(
          ({ name }) => name === APP_SETTINGS.PROGRESS_BAR_DISPLAY,
        ) || DEFAULT_PROGRESS_BAR_DISPLAY_SETTING;
      setProgressBarDisplaySetting(s);
    }
  }, [appSettings, isSuccess]);

  const setShowUserShare = (value) => {
    const newSetting = {
      ...progressBarDisplaySetting,
      data: {
        ...progressBarDisplaySetting.data,
        showUserShare: Boolean(value),
      },
    };
    postAppSetting(newSetting);
  };

  const show = () => setShowUserShare(true);
  const hide = () => setShowUserShare(false);

  const disable = progressBarDisplaySetting && progressBarDisplaySetting?.id;

  return (
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
        {t('Display user share in progress bar ?')}
      </Typography>
      <FormControlLabel
        control={
          <span>
            <Button
              disabled={disable}
              variant="contained"
              color="secondary"
              onClick={progressBarDisplaySetting ? show : null}
            >
              {t('Show')}
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              color="secondary"
              onClick={progressBarDisplaySetting ? hide : null}
            >
              {t('Hide')}
            </Button>
          </span>
        }
      />
    </div>
  );
};

export default SettingsProgressBar;
