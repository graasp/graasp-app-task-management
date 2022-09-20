import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

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
