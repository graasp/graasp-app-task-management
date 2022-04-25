/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { StackedHorizontalBarChart } from 'react-stacked-horizontal-bar-chart';

const ProgressBar = ({
  numberOfCompletedTasks,
  totalNumberOfTasks,
  contributions,
  tasks,
}) => {

  const completionRatio = Number.isNaN(
    Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100),
  )
    ? 0
    :  Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100);

  const membersContributions = contributions.map((cont) =>
    Number.isNaN(cont.memberContribution) ? 0 : cont.memberContribution,
  );
  console.log('contr', membersContributions);

  const data = [0];
  const back = ['whitesmoke'];
  membersContributions.map((cont) => data.push(cont));
  contributions.map((cont) => back.push(cont.color));
  console.log('back', back);



  let total = membersContributions.reduce((a, b) => a + b, 0);
  total = Number.isNaN(total) ? 0 : total;

  
  const isNotAssigned = (task) => {
    if (task.data.label === 'completed') {
      if (task.data.members.length === 0) {
        return true;
      }
    }
    return false;
  };
  let count = 0;
  const containsNonAssignedTask = (arr) => {
    if (arr._tail) {
      if (arr._tail.array.map((task) => isNotAssigned(task))) {
        count += 1;
      }
    }
    return count;
  };
  const counter = containsNonAssignedTask(tasks);

  if (completionRatio !== 100 || counter !== 0) {
    data.push(Math.floor(completionRatio - total));
    back.push('GrayText');
    data.push(Math.floor(100 - completionRatio));
    console.log('rest',100 - completionRatio)
    back.push(completionRatio === 100 ? 'GrayText' : 'whitesmoke');
  }
  console.log('data', data);
  console.log(back);

  return (
    <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
      <StackedHorizontalBarChart
        height={10}
        ranges={data}
        backgroundColors={back}
      />
    </div>
  );
};


ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
  contributions: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default ProgressBar;
