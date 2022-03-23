import React from 'react';
import ProgressBar from './ProgressBar';

const Footer = (props) => {
  return (
    <div className="main-footer">
      {/* <h4 style={{color:"black"}}>{props.completionRatio
            ? props.completionRatioText(props.completionRatio)
            : 'Your Progress'}</h4> */}
      <h4 style={{ color: 'black' }}>
        {props.completionRatio === 100 ? 'Done!' : 'Your Progress'}
      </h4>
      <ProgressBar
        bgcolor={props.bgcolor}
        progress={props.completionRatio ? props.completionRatio : 0}
        height={20}
        numberOfCompletedTasks={props.numberOfCompletedTasks}
        totalNumberOfTasks={props.totalNumberOfTasks}
        completionRatio={props.completionRatio}
      />
    </div>
  );
};

export default Footer;
