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
  // numberOfCompletedTasks,
  // totalNumberOfTasks,
  contributions,
}) => {
  // const data = [{ name: 'Graasp', contribution: 0.33,help:0.2 }];

  // const completionRatio = Number.isNaN(
  //   Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100),
  // )
  //   ? 0
  //   : Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100);

  const contt = contributions.map((cont) =>
    Number.isNaN(cont.contribution) ? 0 : cont.contribution,
  );
  contributions.map((cont) => console.log(cont.name, cont.contribution));
  let total = contt.reduce((a, b) => a + b, 0);
  total = Number.isNaN(total) ? 0 : total;

  // const isNotAssigned = (task) => {
  //   if (task.data.members.length === 0) {
  //     return true;
  //   }
  //   return false;
  // };
  // const containsNonAssignedTask = (arr) => {
  //   // eslint-disable-next-line no-underscore-dangle
  //   if (arr._tail) {
  //     // eslint-disable-next-line no-underscore-dangle
  //     if (arr._tail.array.map((task) => isNotAssigned(task))) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  // const Parentdiv = {
  //   height: 20,
  //   width: '300px',
  //   backgroundColor: 'whitesmoke',
  //   borderRadius: 40,
  //   margin: 'auto',
  // };

  const Childdiv = {
    height: '100%',
    // width: `${total}%`,
    // background: 'linear-gradient(to left,#0a5510, #0ba746)',
    borderRadius: '20px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // // I can have an array of child divs where each child div begins at the end of the other

  // const progresstext = {
  //   padding: 10,
  //   color: 'black',
  //   fontWeight: 700,
  //   marginLeft: !completionRatio || completionRatio < 11 ? '30px' : 0,
  // };

  Childdiv.width = `${total}%`;
  Childdiv.background = `linear-gradient(to left,rgb(${Math.random() * 60},${
    Math.random() * 20
  },${Math.random() * 100}), #0ba746)`;
  return (
    //   <div style={Parentdiv}>
    //     <div style={Childdiv} width={`${total}%`} >
    //       <span style={progresstext}>{`${numberOfCompletedTasks}/${
    //         totalNumberOfTasks ?? ''
    //       }`}</span>
    //       <div style={Childdiv} width={`${100-total}%`} background='blue'/>
    //     </div>

    //   </div>
    <div style={{ width: "50%",marginLeft:'auto',marginRight: 'auto'}}>
        <StackedHorizontalBarChart
          height={10}
          ranges={[20, 40, 10]}
          backgroundColors={["#4F81BD", "#C0504D", "#9BBB59"]}
          points={[
            {
              value: 10,
              // any marker can be used, the component will place the bottom of the marker on top of the bar
            },
            {
              value: 30
            }
          ]}
        />
      </div>
   
  );
};


export default ProgressBar1;
