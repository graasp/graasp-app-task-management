/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@graasp/ui';

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

const FilterMembers = ({ setToggle }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
        {t('Filter Members')}
      </Typography>
      <FormControlLabel
        control={
          <span>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setToggle(true)}
            >
              {t('Filter')}
            </Button>
          </span>
        }
      />
    </div>
  );
};

export default FilterMembers;
