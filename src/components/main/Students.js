/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { useAppContext } from '../context/appData';

const Students = ({ students, setStudents, contributions }) => {
  // const [students, setStudents] = useState([]);

  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);
  console.log('stds', students);

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

  const emails = [
    'gracianaaad@hotmail.com',
    'denis.gillet@epfl.ch',
    'jeremy.lascala@epfl.ch',
  ];
  const isChecked = (email) => {
    if (emails.includes(email)) {
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
          {isChecked(student.email) ? (
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
