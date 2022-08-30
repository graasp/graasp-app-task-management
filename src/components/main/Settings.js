/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* The click event is used only to prevent its propagation to the canvas. */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DownloadActions from './settings/DownloadActions';
import ShowProgress from './ShowProgress';
import FilterMembers from './settings/FilterMembers';
import FilterModal from './FilterModal';
// import Data from './Data';
import SettingsProgressBar from './settings/SettingsProgressBar';

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

// eslint-disable-next-line no-unused-vars
const Settings = ({ toggle, setToggle, tasks, members, students,setStudents, filteredNames, setFilteredNames, addStd }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={(event) => event.stopPropagation()}>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={(event) => {
            event.stopPropagation();
            handleModalOpen();
          }}
        >
          <SettingsIcon />
        </Fab>
        {!toggleFilter ? (
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            className={classes.modal}
          >
            <div className={classes.modalContainer}>
              <ShowProgress
                setToggle={setToggle}
                toggle={toggle}
                handleModalClose={handleModalClose}
              />
              <br />
              <DownloadActions members={members} />
              <SettingsProgressBar />
              <FilterMembers
                setToggle={setToggleFilter}
                toggle={toggleFilter}
              />
              <br />

              {/* <Data handleModalClose={handleModalClose} tasks={tasks} /> */}

              <Divider className={classes.divider} />

              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleModalClose}
                  className={classes.closeButton}
                >
                  {t('Close')}
                </Button>
              </div>
            </div>
          </Modal>
        ) : (
          <FilterModal
            setToggle={setToggleFilter}
            toggle={toggleFilter}
            handleModalClose={handleModalClose}
            modalOpen={modalOpen}
            filteredNames={filteredNames}
            setFilteredNames={setFilteredNames}
            students={students}
            setStudents={setStudents}
            addStd={addStd}

          />
        )}
      </div>
    </>
  );
};

export default Settings;
