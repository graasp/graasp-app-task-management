/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Modal from '@material-ui/core/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
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

  const removeStudent = (studentName, array) => {
    const index = array.indexOf(studentName);
    if (index > -1) {
      // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }

    return array;
  };

  const arr = students;

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      className={classes.modal}
    >
      <div className={classes.modalContainer}>
        {/* <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Members" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          > */}
        {/* {students.map((student) => (
      <MenuItem key={student.id} value={student.name}>
        <Checkbox checked={personName.indexOf(student) > -1} />
        <ListItemText primary={student.name} />
      </MenuItem>
    ))} */}
        {/* {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {students.map((std) => (
          <div>
            <IconButton
              aria-label="delete"
              size="small"
              //   onClick={() => setStudents(removeStudent(std, arr))}
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
