import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { useAppContext } from '../context/appData';

const Students = () => {
  const [students, setStudents] = useState([]);
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
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

      {students.map((student) => (
        <div>
          <li
            className="draggable"
            key={student.name}
            draggable
            onDragStart={(e) => onDragStart(e, student.name)}
          >
            <div className="member-container">{student.name}</div>
          </li>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Students;
