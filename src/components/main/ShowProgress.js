import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';

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

// eslint-disable-next-line react/prop-types
const ShowProgress = ({ setToggle, toggle, handleModalClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
        {t('Track your progress.')}
      </Typography>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setToggle(!toggle);
              handleModalClose();
            }}
          >
            {t('Progress')}
          </Button>
        }
      />
    </div>
  );
};

export default ShowProgress;
