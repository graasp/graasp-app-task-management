/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
// import ProgressBar2 from './ProgressBar2';
import ProgressBar from './ProgressBar';


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
              : 'Tasks Progress'}
          </h4>
          <ReactTooltip
            id="test"
            backgroundColor="whitesmoke"
            multiline="true"
            textColor="black"
          />

          <ProgressBar
            numberOfCompletedTasks={numberOfCompletedTasks}
            totalNumberOfTasks={totalNumberOfTasks}
            contributions={contributions}
            tasks={tasks}
          />
        </div>
      ) : (
        
          <FormControlLabel
          control={
            <Button
              variant="contained"
              color="#F6ECF5"
              onClick={() => {
                setToggle(!toggle);
                setToggleFooter(false);
              }}
            >
              Show Tasks
            </Button>
          }
        />
        
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
