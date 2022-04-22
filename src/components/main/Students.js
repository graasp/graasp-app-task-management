/* eslint-disable react/prop-types */
import React, {  useEffect } from 'react';
import { t } from 'i18next';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { useAppContext } from '../context/appData';

const Students = ({setStudents,contributions}) => {
  // const [students, setStudents] = useState([]);
  
  const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

  useEffect(() => {
    if (isAppContextSuccess) {
      setStudents(appContext?.get('members'));
    }
  }, [appContext, isAppContextSuccess]);

  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
  };

  // const chooseColor=(name,cont)=>{

  //   if(name===cont.name){

  //     return cont.color;
  //   }
  //   return '';
    
  // }
  // const chooseColorForMember=(name)=>{
  //  contributions.forEach((cont)=>chooseColor(name,cont))
   
   
  // }

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
          <li
            className="draggable"
            key={student.name}
            draggable
            onDragStart={(e) => onDragStart(e, student.name)}
          >
            <div className="member-container" style={{backgroundColor:student.color}}>{student.name}</div>
          </li>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Students;
