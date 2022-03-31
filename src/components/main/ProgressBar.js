import React from 'react';

const ProgressBar = ({ numberOfCompletedTasks, totalNumberOfTasks }) => {
  let completionRatio = Math.floor(
    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  );
  let progress = completionRatio ? completionRatio : 0;

  const Parentdiv = {
    height: 20,
    width: '300px',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 'auto',
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    background: 'linear-gradient(to left,#0a5510, #0ba746)',
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
    marginLeft: !completionRatio || completionRatio < 11 ? '30px' : 0,
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
