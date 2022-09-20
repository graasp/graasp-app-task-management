/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from '@mui/material/Tooltip';

// This is the window where the user can filter members

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
  filteredNames,
  setFilteredNames,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const arr = filteredNames;

  const filterOutMember = (studentName, array) => {
    // This function filters out the specific member's name from the members' array
    const index = array.indexOf(studentName);
    if (index > -1) {
      array.splice(index, 1);
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
            <Tooltip title="Filter Member">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  setFilteredNames([...filteredNames, std.name]);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {std.name}
          </div>
        ))}
        {filteredNames.map((std) => (
          <div style={{ color: 'GrayText' }}>
            <Tooltip title="Recover Member">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  setFilteredNames([...filterOutMember(std, arr)]);
                }}
              >
                <ReplayIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
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
