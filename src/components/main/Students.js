import { MdPlayCircleOutline, MdSupervisedUserCircle } from 'react-icons/md';
import _ from 'lodash';
import { v4 } from 'uuid';

const options = [
  {
    id: v4(),
    value: 'john',
    label: 'John',
    icon: <MdPlayCircleOutline style={{ color: 'blue' }} />,
  },
  {
    id: v4(),
    value: 'anna',
    label: 'Anna',
    icon: <MdPlayCircleOutline style={{ color: 'red' }} />,
  },
  {
    id: v4(),
    value: 'james',
    label: 'James',
    icon: <MdPlayCircleOutline style={{ color: 'black' }} />,
  },
  {
    id: v4(),
    value: 'mary',
    label: 'Mary',
    icon: <MdPlayCircleOutline style={{ color: 'green' }} />,
  },
  {
    id: v4(),
    value: 'jason',
    label: 'Jason',
    icon: <MdPlayCircleOutline style={{ color: 'orange' }} />,
  },
  {
    id: v4(),
    value: 'dana',
    label: 'Dana',
    icon: <MdPlayCircleOutline style={{ color: 'purple' }} />,
  },
];

const Students = () => {
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

      {options.map((option) => (
        <div>
          <li
            key={option.value}
            draggable
            style={{ listStyleType: 'none' }}
            onDragStart={(e) => onDragStart(e, option.label)}
          >
            {option.label}
          </li>
          <br />
        </div>
      ))}
    </div>
  );
};

{
  /* <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li>
        <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li>
        <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li>
        <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li>
        <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li>
        <li style={{marginTop:"10px"}}>
          <MdPlayCircleOutline />
        </li> */
}

export default Students;
