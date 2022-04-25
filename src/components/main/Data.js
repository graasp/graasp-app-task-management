/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable new-cap */
import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const Data = ({ tasks, handleModalClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const pdfGenerate = () => {
    const doc = new jsPDF('landscape', 'px', 'a4', 'false');
    // doc.addPage();
    // eslint-disable-next-line arrow-body-style
    tasks?._tail.array.map((task, index) => {
      return (
        doc.setFont('Helvertica', 'bold'),
        doc.text(60, 60 + index * 20, `Task: ${task.data.title}`),
        // doc.text(60+task.data.title.length*20, 60 + index * 20, `Members: ${task.data.members}`)
        doc.setFont('Helvertica', 'Normal'),
        doc.text(300, 60 + index * 20, `Members: ${task.data.members}`)
      );
    });

    //
    // doc.text(60,100,'Mob.No.')
    // doc.setFont('Helvertica','Normal')
    // doc.text(100,60,': ABC')
    // doc.text(100,80,': abc@gmail.com')
    // doc.text(120,100,': 54645656')
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
