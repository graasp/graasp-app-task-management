/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { useAppContext } from '../context/appData';

const Students = ({ setStudents, contributions }) => {
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
  };

  const names = [
    'Graciana Aad',
    'Denis Gillet',
    'Jérémy La Scala',
    'Kimiya Behbahani Zadeh',
    'Zoubida Squalli Houssaini',
    'Margot Romelli',
  ];
  const isChecked = (name) => {
    if (names.includes(name)) {
      return false;
    }
    return true;
  };

  return (
    <div
      style={{
        textAlign: 'center',
        verticalAlign: 'middle',
        listStyleType: 'none',
      }}
    >
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
    </div>
  );
};

export default Students;
