import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import ToggleContainer from '../common/ToggleContainer';

// eslint-disable-next-line react/prop-types
const ShowProgress = ({ setToggle, toggle, handleModalClose }) => {
  const { t } = useTranslation();

  return (
    <ToggleContainer>
      <Typography
        sx={{
          fontSize: '1.05vw',
        }}
      >
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
    </ToggleContainer>
  );
};

export default ShowProgress;
