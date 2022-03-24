import { useState, useEffect } from 'react';
import { MdSupervisedUserCircle } from 'react-icons/md';
import _ from 'lodash';
import { useAppContext /* useAppActions */ } from '../context/appData';

const Students = () => {
  const [avStudents, setAvStudents] = useState([]);
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setAvStudents(appContext?.get('members'));
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
        <MdSupervisedUserCircle />
      </h3>

      {avStudents.map((avStudent) => (
        <div>
          <li
            key={avStudent.name}
            draggable
            style={{ listStyleType: 'none' }}
            onDragStart={(e) => onDragStart(e, avStudent.name)}
          >
            {avStudent.name}
          </li>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Students;
