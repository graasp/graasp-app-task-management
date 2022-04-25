/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { StackedHorizontalBarChart } from 'react-stacked-horizontal-bar-chart';

// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

// const CustomizedLabel = (props) => {
//   const { x, y, fill, value } = props;
//   return (
//     <text
//       x={x}
//       y={y}
//       fontSize="16"
//       fontFamily="sans-serif"
//       fill={fill}
//       textAnchor="start"
//     >
//       {value}%
//     </text>
//   );
// };

const ProgressBar1 = ({
  numberOfCompletedTasks,
  totalNumberOfTasks,
  contributions,
  tasks,
}) => {
  // const data = [{ name: 'Graasp', contribution: 0.33,help:0.2 }];

  const completionRatio = Number.isNaN(
   (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  )
    ? 0
    : (numberOfCompletedTasks / totalNumberOfTasks) * 100;

  const membersContributions = contributions.map((cont) =>
    Number.isNaN(cont.contribution) ? 0 : cont.contribution,
  );
  console.log('contr', membersContributions);

  const data = [0];
  const back = ['whitesmoke'];
  membersContributions.map((cont) => data.push(cont));
  contributions.map((cont) =>
    // back.push(
    //   `rgb(${Math.floor(Math.random() * 230)},${Math.floor(
    //     Math.random() * 70,
    //   )},${Math.floor(Math.random() * 100)})`,
    // ),
    back.push(cont.color)
  );
  console.log('back',back)

  let total = membersContributions.reduce((a, b) => a + b, 0);
  total = Number.isNaN(total) ? 0 : total;

  console.log(total);
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

export default ProgressBar1;

{
  /* <div>
      <div
        className="progress"
        onClick={() => toggleTheme()}
        style={{ marginLeft: 25, marginRight: 25 }}
      >
        {contributions.map((contrib) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            className="progress-bar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: `${
                Number.isNaN(contrib.contribution) ? 0 : contrib.contribution
              }%`,
              backgroundColor: `rgb(${Math.floor(
                Math.random() * 10,
              )}, ${Math.floor(Math.random() * 200)}, ${Math.floor(
                Math.random() * 100,
              )})`,
            }}
          >
            {`${contrib.name}${' '}${
              Number.isNaN(contrib.contribution) ? 0 : contrib.contribution
            }%`}
          </div>
        ))}
        {completionRatio !== total && containsNonAssignedTask(tasks) ? (
          <div
            className="progress-bar"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: `${
                Number.isNaN(completionRatio - total)
                  ? 0
                  : completionRatio - total
              }%`,
              backgroundColor: 'green',
            }}
          >
            {' '}
            {`${
              Number.isNaN(completionRatio - total)
                ? 0
                : completionRatio - total
            }%`}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
 */
}
