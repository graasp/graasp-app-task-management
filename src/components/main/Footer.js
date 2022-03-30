import React from 'react';
import ProgressBar from './ProgressBar';

const Footer = ({ totalNumberOfTasks, numberOfCompletedTasks }) => {
  return (
    <div className="main-footer">
      <h4 style={{ color: 'black' }}>
        {totalNumberOfTasks/numberOfCompletedTasks===1
          ? 'Done!'
          : 'Your Progress'}
      </h4>
      <ProgressBar
        numberOfCompletedTasks={numberOfCompletedTasks}
        totalNumberOfTasks={totalNumberOfTasks}
      />
    </div>
  );
};

export default Footer;
