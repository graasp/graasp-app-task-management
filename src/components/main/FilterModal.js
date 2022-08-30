/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '30%',
    maxHeight: '50%',
    padding: theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: '1.5vw',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeButton: {
    width: '20%',
    fontSize: '1vw',
  },
}));

const FilterModal = ({
  handleModalClose,
  modalOpen,
  setToggle,
  students,
  setStudents,
  filteredNames,
  setFilteredNames,
}) => {
  const [personName, setPersonName] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const arr = filteredNames;

  const removeStudent = (studentName, array) => {
    const index = array.indexOf(studentName);
    if (index > -1) {
      // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }

    return array;
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      className={classes.modal}
    >
      <div className={classes.modalContainer}>

        {students.map((std) => (
          <div>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setFilteredNames([...filteredNames, std.name]);
                console.log(filteredNames);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            {std.name}
          </div>
        ))}
        {filteredNames.map((std) => (
          <div style={{ color: 'GrayText' }}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setFilteredNames([...removeStudent(std, arr)]);
              }}
            >
              <ReplayIcon fontSize="inherit"/>
            </IconButton>
            {std}
          </div>
        ))}

        <Divider className={classes.divider} />

        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleModalClose();
              setToggle(false);
            }}
            className={classes.closeButton}
          >
            {t('Close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
