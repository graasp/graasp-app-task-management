/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const Footer = ({
  totalNumberOfTasks,
  numberOfCompletedTasks,
  toggle,
  setToggle,
}) => (
  <div className="main-footer">
    <h4
      style={{ color: 'black', cursor: 'pointer' }}
      onClick={() => setToggle(!toggle)}
    >
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
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default Footer;
