/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* The click event is used only to prevent its propagation to the canvas. */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DownloadActions from './settings/DownloadActions';
import ShowProgress from './ShowProgress';
import FilterMembers from './settings/FilterMembers';
// import FilterModal from './FilterModal';
import SettingsProgressBar from './settings/SettingsProgressBar';
import ModalContainer from '../common/ModalContainer';
import ButtonContainer from '../common/ButtonContainer';

// eslint-disable-next-line no-unused-vars
const Settings = ({
  toggle,
  setToggle,
  members,
  // filteredNames,
}) => {
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
          sx={{
            position: 'fixed',
            bottom: 1,
            right: 1,
          }}
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
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ModalContainer>
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

              <Divider
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              />

              <ButtonContainer>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleModalClose}
                  sx={{
                    width: '20%',
                    fontSize: '1vw',
                  }}
                >
                  {t('Close')}
                </Button>
              </ButtonContainer>
            </ModalContainer>
          </Modal>
        ) : (
          // <FilterModal
          //   setToggle={setToggleFilter}
          //   toggle={toggleFilter}
          //   handleModalClose={handleModalClose}
          //   modalOpen={modalOpen}
          //   filteredNames={filteredNames}
          // />
          <p>Nothing.</p>
        )}
      </div>
    </>
  );
};

export default Settings;
