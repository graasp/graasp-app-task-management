/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
// import ProgressBar2 from './ProgressBar2';
import ProgressBar1 from './ProgressBar';


const Footer = ({
  totalNumberOfTasks,
  numberOfCompletedTasks,
  toggle,
  setToggle,
  contributions,
  tasks
}) => (
  <div className="main-footer">
    <h4
      data-tip="rthr thr"
      data-for="test"
      style={{ color: 'black', cursor: 'pointer' }}
      onClick={() => setToggle(!toggle)}
    >
      {totalNumberOfTasks / numberOfCompletedTasks === 1
        ? 'Done!'
        : 'Your Progress'}
    </h4>
    <ReactTooltip id="test" />

    {/* <ProgressBar2
      numberOfCompletedTasks={numberOfCompletedTasks}
      totalNumberOfTasks={totalNumberOfTasks}
      contributions={contributions}
      tasks={tasks}
    /> */}
    <ProgressBar1
      numberOfCompletedTasks={numberOfCompletedTasks}
      totalNumberOfTasks={totalNumberOfTasks}
      contributions={contributions}
      tasks={tasks}
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
