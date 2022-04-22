/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
// import ProgressBar2 from './ProgressBar2';
import ProgressBar1 from './ProgressBar';

const Footer = ({
  totalNumberOfTasks,
  numberOfCompletedTasks,
  toggle,
  setToggle,
  contributions,
  tasks,
}) => {
  const [toggleFooter, setToggleFooter] = useState(false);

  const legend = [];
  if (contributions) {
    contributions.map((cont) =>
      legend.push({
        description: `${cont.name}: ${cont.contribution}%`,
      }),
    );
  }

  console.log(legend);

  let text = legend.map((user) => `${user.description}`);
  text = text.join('<br>');
  console.log('txt', text);

  return (
    <div className="main-footer">
      {!toggleFooter ? (
        <div className="main-footer">
          <h4
            data-tip={text}
            data-for="test"
            style={{ color: 'black', cursor: 'pointer' }}
            onClick={() => {
              setToggle(!toggle);
              setToggleFooter(true);
            }}
          >
            {totalNumberOfTasks / numberOfCompletedTasks === 1
              ? 'Done!'
              : 'Show Progress'}
          </h4>
          <ReactTooltip
            id="test"
            backgroundColor="whitesmoke"
            multiline="true"
            textColor="black"
          />

          {/* <ProgressBar2
      numberOfCompletedTasks={numberOfCompletedTasks}
      totalNumberOfTasks={totalNumberOfTasks}
      contributions={contributions}
      tasks={tasks}
    /> */}
          <ProgressBar1
            numberOfCompletedTasks={numberOfCompletedTasks}
            totalNumberOfTasks={totalNumberOfTasks}
            contributions={contributions}
            tasks={tasks}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setToggle(!toggle);
            setToggleFooter(false);
          }}
        >
          Show Tasks
        </button>
      )}
    </div>
  );
};

Footer.propTypes = {
  totalNumberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default Footer;
