import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ numberOfCompletedTasks, totalNumberOfTasks }) => {
  const completionRatio = Math.floor(
    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  );
  const progress = completionRatio?? 0;

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

ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default ProgressBar;
