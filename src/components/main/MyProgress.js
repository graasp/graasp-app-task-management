/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MyProgress = ({
  students,
  tasks,
  completedTasks,
  totalNumberOfTasks,
}) => {
  // number of tasks assigned to the user
  let nbOfAssignements = 0;

  // percentage of contribution of the user per task
  let contribution = 0;
  let contributions = 0;

  const incrementCount = (label, arr, member) => {
    if (label === 'completed') {
      if (arr.includes(member.name)) {
        nbOfAssignements += 1;
        contribution = 1 / arr.length;
        contributions += contribution;
      }
    }
  };
  if (tasks._tail) {
    tasks._tail.array.forEach((task) => {
      incrementCount(task.data.label, task.data.members, students[0]);
    });
  }
  console.log(
    'ass',
    nbOfAssignements,
    'conts',
    contributions,
    'comp',
    completedTasks,
    'total',
    totalNumberOfTasks,
  );
  let percentage = Math.floor((contributions / totalNumberOfTasks) * 100);

  if (totalNumberOfTasks === 0 || completedTasks === 0) {
    percentage = 0;
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors
            pathColor: `rgba(62, 10, 199, ${percentage / 100})`,
            textColor: 'black',
            trailColor: 'whitesmoke',
          })}
        />
      </div>
    </div>
  );
};

export default MyProgress;
