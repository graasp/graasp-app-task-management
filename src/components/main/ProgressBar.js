import React, { useState, useEffect } from 'react';

const ProgressBar = ({
  completionRatio,
  progress,
  height,
  numberOfCompletedTasks,
  totalNumberOfTasks,
}) => {
  const completionRatioColor = (completionRatio) => {
    if (completionRatio >= 0 && completionRatio < 25) {
      return "orangered"; //'palegreen'; 
    }
    if (completionRatio >= 25 && completionRatio < 50) {
      return "orange"; // 'greenyellow';
    }
    if (completionRatio === 50) {
      return 'yellow';
    }
    if (completionRatio > 50 && completionRatio < 75) {
      return 'mediumseagreen'; //"yellow";
    }
    if (completionRatio >= 75 && completionRatio < 100) {
      return 'olivedrab'; //"dodgerblue";
    }
    if (completionRatio === 100) {
      return 'darkgreen'; //"green";
    }
  };
  const Parentdiv = {
    height: height,
    width: '300px',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 'auto',
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    // backgroundColor: completionRatioColor(completionRatio),
    // borderRadius: 40,
    // textAlign: 'center',
    background: 'linear-gradient(to left,#0a5510, #0ba746)',
    //boxShadow:'0 3px 3px -5px #F2909C, 0 2px 5px #18cf62',
    borderRadius: '20px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 700,
    marginLeft: completionRatio<11?"20px":0,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span
          style={progresstext}
        >{`${numberOfCompletedTasks}/${totalNumberOfTasks}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

//{`${progress}%`}
