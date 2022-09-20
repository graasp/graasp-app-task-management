/* eslint-disable react/prop-types */
import React from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')(() => ({
  color: 'black',
  backgroundColor: 'white',
  border: '1px solid rgb(209, 200, 200)',
  padding: '10px',
  borderRadius: '1.5625em',
  textAlign: 'center',
  verticalAlign: 'middle',
  listStyleType: 'none',
}));

const Students = ({ contributions, filteredNames }) => {
  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
  };

  const isChecked = (name) => {
    if (filteredNames?.includes(name)) {
      return false;
    }
    return true;
  };

  return (
    <StyledContainer>
      <h3>
        <MdSupervisedUserCircle title={t('Students')} />
      </h3>

      {contributions.map((student) => (
        <div>
          {isChecked(student.name) ? (
            <li
              className="draggable"
              key={student.name}
              draggable
              onDragStart={(e) => onDragStart(e, student.name)}
            >
              <div
                className="member-container"
                style={{ backgroundColor: student.color }}
              >
                {student.name}
              </div>
              <br />
            </li>
          ) : null}
        </div>
      ))}
    </StyledContainer>
  );
};

export default Students;
