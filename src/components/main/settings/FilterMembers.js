/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@graasp/ui';
import ToggleContainer from '../../common/ToggleContainer';

const FilterMembers = ({ setToggle }) => {
  const { t } = useTranslation();

  return (
    <ToggleContainer>
      <Typography sx={{
    fontSize: '1.05vw',
  }}>
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
    </ToggleContainer>
  );
};

export default FilterMembers;
