/* eslint-disable react/prop-types */
import React from 'react';
import Students from './Students';

import Global from './Global';

import Home from './Home';

const data = [
  {
    id: Math.random(),
    bgColor: '#D5CAFA',
  },
  {
    id: Math.random(),
    bgColor: '#EDA9A9',
  },
  {
    id: Math.random(),
    bgColor: '#F2EE8D',
  },
];

// eslint-disable-next-line arrow-body-style
const Demo = ({ setStudents,contributions  }) => {
  return (
    <div className="row">
    <div className="members-column column">
        <Students setStudents={setStudents} contributions={contributions} />
      </div>

      <Global />
      <Home
        boxData={data}
        setStudents={setStudents} contributions={contributions} 
      />
    </div>
  );
};

export default Demo;
