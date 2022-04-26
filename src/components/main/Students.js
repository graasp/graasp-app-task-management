/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { useAppContext } from '../context/appData';

const Students = ({ students, setStudents, contributions }) => {

  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
  };
  // Check other names: Graciana, Jeremy, Denis... OR emails
  // const isChecked = (name) => {
  //   if (name === 'Jason') {
  //     return false;
  //   }
  //   return true;
  // };

  const names = [
    'Graciana Aad',
    'Denis Gillet',
    'Jérémy La Scala',
  ];
  const isChecked = (name) => {
    if (names.includes(name)) {
      return false;
    }
    console.log(name)
    return true;
  };
  console.log(students)

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
