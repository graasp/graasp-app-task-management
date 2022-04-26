import React from 'react';

import Global from "./Global";

import Home from "./Home";



const data = [
  {
    id: Math.random(),
    bgColor: "#D5CAFA"
  },
  {
    id: Math.random(),
    bgColor: "#EDA9A9"
  },
  {
    id: Math.random(),
    bgColor: "#F2EE8D"
  },
  
];

function Demo() {
  return (
    <>
      <Global />
      <Home boxData={data} />
    </>
  );
}

export default Demo;
