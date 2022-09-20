import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

const ToggleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

// eslint-disable-next-line react/prop-types
const ShowProgress = ({ setToggle, toggle, handleModalClose }) => {
  const { t } = useTranslation();

  return (
    <ToggleContainer>
      <Typography sx={{
    fontSize: '1.05vw',
  }}>
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
