/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from '@mui/material/Tooltip';
import ModalContainer from '../common/ModalContainer';
import ButtonContainer from '../common/ButtonContainer';

// This is the window where the user can filter members

const FilterModal = ({
  handleModalClose,
  modalOpen,
  setToggle,
  students,
  filteredNames,
  setFilteredNames,
}) => {
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalContainer>
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
            onClick={() => {
              handleModalClose();
              setToggle(false);
            }}
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
  );
};

export default FilterModal;
