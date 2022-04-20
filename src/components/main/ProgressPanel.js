/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// /* eslint-disable arrow-body-style */
// import React from 'react';
// import ShowProgress from './ShowProgress';
// import ProgressBar from './ProgressBar';

// // eslint-disable-next-line react/prop-types
// const ProgressPanel = ({toggle,setToggle}) => {
//   return (
//     <div className="center">
//       <ProgressBar
//       numberOfCompletedTasks={1}
//       totalNumberOfTasks={8}
//     />
//     <br />
//     <ProgressBar
//       numberOfCompletedTasks={4}
//       totalNumberOfTasks={5}
//     />
//         <br />

//       <ShowProgress setToggle={setToggle} toggle={toggle} />
//     </div>
//   );
// };

// export default ProgressPanel;
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// eslint-disable-next-line no-unused-vars
const ProgressPanel = ({ completedTasks, totalNumberOfTasks }) => {
  let percentage = Math.floor((completedTasks / totalNumberOfTasks) * 100);

  if (totalNumberOfTasks === 0) {
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
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: 'black',
            trailColor: 'whitesmoke',
          })}
        />
      </div>
    </div>
  );
};

export default ProgressPanel;
