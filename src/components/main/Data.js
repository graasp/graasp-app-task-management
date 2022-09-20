import React from 'react';
import { Button } from '@graasp/ui';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import jsPDF from 'jspdf';
import ToggleContainer from '../common/ToggleContainer';

// TODO: validate props
// eslint-disable-next-line react/prop-types
const Data = ({ tasks, handleModalClose }) => {
  const { t } = useTranslation();

  const pdfGenerate = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF('landscape', 'px', 'a4', 'false');
    // TODO: also validate this.
    // eslint-disable-next-line react/prop-types
    tasks?.forEach((task, index) => {
      doc.setFont('Helvertica', 'bold');
      doc.text(60, 60 + index * 20, `Task: ${task.data.title}`);
      doc.setFont('Helvertica', 'Normal');
      doc.text(300, 60 + index * 20, `Members: ${task.data.members}`);
    });
    doc.save('a.pdf');
  };

  return (
    <ToggleContainer>
      <Typography sx={{
    fontSize: '1.05vw',
  }}>
        {t('Generate PDF.')}
      </Typography>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              pdfGenerate();
              handleModalClose();
            }}
          >
            {t('Generate PDF')}
          </Button>
        }
      />
    </ToggleContainer>
  );
};

export default Data;
