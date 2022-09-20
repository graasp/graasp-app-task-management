import React from 'react';
import { Button } from '@graasp/ui';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import jsPDF from 'jspdf';

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

// TODO: validate props
// eslint-disable-next-line react/prop-types
const Data = ({ tasks, handleModalClose }) => {
  const classes = useStyles();
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
    <div className={classes.toggleContainer}>
      <Typography className={classes.headerText}>
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
    </div>
  );
};

export default Data;
