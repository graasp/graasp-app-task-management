/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
// import StepsProgressBar from 'react-line-progress-bar-steps';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const CustomizedLabel = (props) => {
  const { x, y, fill, value } = props;
  return (
    <text
      x={x}
      y={y}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="start"
    >
      {value}%
    </text>
  );
};

const ProgressBar = ({ numberOfCompletedTasks, totalNumberOfTasks }) => {
  const data = [{ name: 'bing', value: 0.33 }];
  //   const toggleTheme=()=> {
  //     // Obtains an array of all <link>
  //     // elements.
  //     // Select your element using indexing.
  //     const theme = document.getElementsByTagName('link')[1];

  //     // Change the value of href attribute
  //     // to change the css sheet.
  //     if (theme.getAttribute('href') === 'https://fonts.googleapis.com/icon?family=Material+Icons') {
  //         theme.setAttribute('href', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css');
  //     } else {
  //         theme.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
  //     }
  // }

  const completionRatio = Math.floor(
    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  );

  let progress = 0;

  if (numberOfCompletedTasks === 0 && totalNumberOfTasks === 0) {
    progress = 0;
  } else {
    progress = completionRatio;
  }
  console.log(progress);
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
    // <div className="progress">
    //   {/* onClick={()=>toggleTheme()} */}
    //   <div
    //     className="progress-bar progress-bar-info"
    //     aria-valuenow="25"
    //     aria-valuemin="0"
    //     aria-valuemax="100"
    //     style={{ width: '25%' }}

    //   >
    //     Process1
    //   </div>
    //   <div
    //     className="progress-bar progress-bar-info"
    //     role="progressbar"
    //     aria-valuenow="25"
    //     aria-valuemin="0"
    //     aria-valuemax="100"
    //     style={{ width: '25%' }}
    //   >
    //     Process2
    //   </div>
    //   <div
    //     className="progress-bar progress-bar-warning"
    //     role="progressbar"
    //     aria-valuenow="25"
    //     aria-valuemin="0"
    //     aria-valuemax="100"
    //     style={{ width: '25%' }}
    //   >
    //     Process3
    //   </div>
    //   <div
    //     className="progress-bar progress-bar-danger"
    //     role="progressbar"
    //     aria-valuenow="25"
    //     aria-valuemin="0"
    //     aria-valuemax="100"
    //     style={{ width: '10%' }}
    //   >
    //     Process4
    //   </div>
    // </div>

    <div className="container">
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          barCategoryGap={1}
          // margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            width={150}
            padding={{ left: 20 }}
            dataKey="name"
          />

          <Bar
            dataKey="value"
            fill="#323232"
            label={<CustomizedLabel />}
            stackId="a"
          />
          <Bar
            dataKey="value"
            fill="#35232"
            label={<CustomizedLabel />}
            stackId="a"
          />
          <Bar
            dataKey="value"
            fill="#328232"
            label={<CustomizedLabel />}
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default ProgressBar;
