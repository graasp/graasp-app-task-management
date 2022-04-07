import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const Footer = ({ totalNumberOfTasks, numberOfCompletedTasks }) => (
  <div className="main-footer">
    <h4 style={{ color: 'black' }}>
      {totalNumberOfTasks / numberOfCompletedTasks === 1
        ? 'Done!'
        : 'Your Progress'}
    </h4>
    <ProgressBar
      numberOfCompletedTasks={numberOfCompletedTasks}
      totalNumberOfTasks={totalNumberOfTasks}
    />
  </div>
);

Footer.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default Footer;
