import React from 'react';
import PropTypes from 'prop-types';
// import StepsProgressBar from 'react-line-progress-bar-steps';


const ProgressBar = ({ numberOfCompletedTasks, totalNumberOfTasks }) => {
  const completionRatio = Math.floor(
    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
  );

  let progress = 0;

  if (numberOfCompletedTasks === 0 && totalNumberOfTasks === 0) {
    progress = 0;
  } else {
    progress = completionRatio;
  }
console.log(progress)
  const Parentdiv = {
    height: 20,
    width: '300px',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 'auto',
  };

let color=''
if(progress===100){
    color='blue'
}else{
    color='yellow'
}

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    // background: 'linear-gradient(to left,#0a5510, #0ba746)',
    background:color,
    borderRadius: '20px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

// I can have an array of child divs where each child div begins at the end of the other

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 700,
    marginLeft: !completionRatio || completionRatio < 11 ? '30px' : 0,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${numberOfCompletedTasks}/${
          totalNumberOfTasks ?? ''
        }`}</span>
         <div style={Childdiv}>
        <span style={progresstext}>{`${numberOfCompletedTasks}/${
          totalNumberOfTasks ?? ''
        }`}</span>
      </div>
      <div style={Childdiv}>
        <span style={progresstext}>{`${numberOfCompletedTasks}/${
          totalNumberOfTasks ?? ''
        }`}</span>
      </div>
      </div>
    </div>
    // <StepsProgressBar colorSet='dark' partialValue='55' showPrecentage='end'/>
  );
};

ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default ProgressBar;
