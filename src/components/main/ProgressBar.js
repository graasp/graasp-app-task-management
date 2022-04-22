/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
// import StepsProgressBar from 'react-line-progress-bar-steps';
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

const ProgressBar = ({
  numberOfCompletedTasks,
  totalNumberOfTasks,
  contributions,
  tasks,
}) => {
  // const data = [{ name: 'Graasp', contribution: 0.33,help:0.2 }];

  console.log(contributions);

  const toggleTheme = () => {
    // Obtains an array of all <link>
    // elements.
    // Select your element using indexing.
    const theme = document.getElementsByTagName('link')[1];

    // Change the value of href attribute
    // to change the css sheet.
    if (
      theme.getAttribute('href') ===
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ) {
      theme.setAttribute(
        'href',
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',
      );
    } else {
      theme.setAttribute(
        'href',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
      );
    }
  };

  const completionRatio = Number.isNaN(
    Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100),
  )
    ? 0
    : Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100);

  let progress = 0;

  if (numberOfCompletedTasks === 0 && totalNumberOfTasks === 0) {
    progress = 0;
  } else {
    progress = completionRatio;
  }

  console.log(progress);
  const contt = contributions.map((cont) =>
    Number.isNaN(cont.contribution) ? 0 : cont.contribution,
  );
  let total = contt.reduce((a, b) => a + b, 0);
  total = Number.isNaN(total) ? 0 : total;

  console.log('total', total);
  const contsOnly = [];
  contributions.map((contrib) =>
    Number.isNaN(contrib.contribution)
      ? contsOnly.push(0)
      : contsOnly.push(contrib.contribution),
  );
  console.log(contsOnly);

  console.log('completion', completionRatio);

  const isNotAssigned=(task)=>{
    if(task.data.members.length===0){
      return true;
    }
     return false;
  }
  const containsNonAssignedTask = (arr) => {
    // eslint-disable-next-line no-underscore-dangle
    if (arr._tail) {
      // eslint-disable-next-line no-underscore-dangle
      if (arr._tail.array.map((task)=>isNotAssigned(task))) {
        return true;
      }
    }
    return false;
  };
  //   const checkTotal=(tot)=>{
  //   if(total<100 && numberOfCompletedTasks===totalNumberOfTasks){
  //      const diffToAdd=Math.floor((100-tot)/contributions.length);
  //      console.log('diff',diffToAdd)

  //   }
  // }
  // const checkContribution=(cont)=>{
  //   if(cont.isNaN){
  //     return 0;
  //   }
  //   return cont;
  // }
  // const Parentdiv = {
  //   height: 20,
  //   width: '300px',
  //   backgroundColor: 'whitesmoke',
  //   borderRadius: 40,
  //   margin: 'auto',
  // };

  // const Childdiv = {
  //   height: '100%',
  //   width: `${progress}%`,
  //   background: 'linear-gradient(to left,#0a5510, #0ba746)',
  //   borderRadius: '20px',
  //   color: '#fff',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // };

  // // I can have an array of child divs where each child div begins at the end of the other

  //   const progresstext = {
  //     padding: 10,
  //     color: 'black',
  //     fontWeight: 700,
  //     marginLeft: !completionRatio || completionRatio < 11 ? '30px' : 0,
  //   };

  return (
    // <div style={Parentdiv}>
    //   <div style={Childdiv}>
    //     <span style={progresstext}>{`${numberOfCompletedTasks}/${
    //       totalNumberOfTasks ?? ''
    //     }`}</span>
    //      <div style={Childdiv}>
    //     <span style={progresstext}>{`${numberOfCompletedTasks}/${
    //       totalNumberOfTasks ?? ''
    //     }`}</span>
    //   </div>
    //   <div style={Childdiv}>
    //     <span style={progresstext}>{`${numberOfCompletedTasks}/${
    //       totalNumberOfTasks ?? ''
    //     }`}</span>
    //   </div>
    //   </div>
    // </div>
    // <StepsProgressBar colorSet='dark' partialValue='55' showPrecentage='end'/>
    <div
      className="progress"
      onClick={() => toggleTheme()}
      style={{ marginLeft: 25, marginRight: 25 }}
    >
      {/* <style>
        @import '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css';
      </style> */}
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
            Number.isNaN(completionRatio - total) ? 0 : completionRatio - total
          }%`}
        </div>
      ) : (
        ''
      )}
      {/* <div
        className="progress-bar progress-bar-info"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '25%' }}

      >
        Process1
      </div> */}
      {/* <div
        className="progress-bar progress-bar-info"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '25%' }}
      >
        Process2
      </div>
      <div
        className="progress-bar progress-bar-warning"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '25%' }}
      >
        Process3
      </div> */}
      {/* <div
        className="progress-bar progress-bar-danger"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '10%' }}
      >
        Process4
      </div> */}
    </div>
  );
};

ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default ProgressBar;
