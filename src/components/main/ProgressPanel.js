/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ResponsiveContainer } from 'recharts';
import { CONTAINER_HEIGHT } from '../../config/constants';
import 'react-circular-progressbar/dist/styles.css';

// eslint-disable-next-line no-unused-vars
const ProgressPanel = ({ completedTasks, totalNumberOfTasks }) => {
  let percentage = Math.floor((completedTasks / totalNumberOfTasks) * 100);

  if (totalNumberOfTasks === 0) {
    percentage = 0;
  }
  return (
    <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
          // Colors
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: 'black',
          trailColor: 'whitesmoke',
        })}
      />
    </ResponsiveContainer>
  );
};

export default ProgressPanel;
