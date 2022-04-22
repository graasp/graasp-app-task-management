/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';


const ProgressBar = ({
  numberOfCompletedTasks,
  totalNumberOfTasks,
  contributions,
  tasks,
}) => {


  const toggleTheme = () => {
  
    const theme = document.getElementsByTagName('link')[1];

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


  const contt = contributions.map((cont) =>
    Number.isNaN(cont.contribution) ? 0 : cont.contribution,
  );

  let total = contt.reduce((a, b) => a + b, 0);
  total = Number.isNaN(total) ? 0 : total;



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

  return (
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
            Number.isNaN(completionRatio - total) ? 0 : completionRatio - total
          }%`}
        </div>
      ) : (
        ''
      )}
 
    </div>
  );
};

ProgressBar.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
};

export default ProgressBar;
