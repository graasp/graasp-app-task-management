/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
// import ProgressBar2 from './ProgressBar2';
import ProgressBar from './ProgressBar';
import { DEFAULT_SHOW_USER_SHARE_SETTING } from '../../config/constants';
import { APP_SETTINGS } from '../../constants/constants';
import { useAppSettings } from '../context/appData';

const Footer = ({
  totalNumberOfTasks,
  numberOfCompletedTasks,
  toggle,
  setToggle,
  contributions,
  tasks,
  isChecked,
}) => {
  const [toggleFooter, setToggleFooter] = useState(false);

  const [showUserShare, setShowUserShare] = useState(
    DEFAULT_SHOW_USER_SHARE_SETTING,
  );

  const { data: appSettings, isSuccess } = useAppSettings();

  const legend = [];
  if (contributions) {
    contributions.map((cont) =>
      isChecked(cont.name)
        ? legend.push({
            description: `${cont.name}: ${cont.memberContribution}%`,
          })
        : null,
    );
  }

  let text = legend.map((user) => `${user.description}`);
  text = text.join('<br>');

  useEffect(() => {
    if (isSuccess) {
      setShowUserShare(
        Boolean(
          appSettings?.find(
            ({ name }) => name === APP_SETTINGS.PROGRESS_BAR_DISPLAY,
          )?.data?.showUserShare ?? DEFAULT_SHOW_USER_SHARE_SETTING,
        ),
      );
    }
  });

  const displayPercentage = () => {
    if (totalNumberOfTasks === 0) {
      return 0;
    }
    if (
      Number.isNaN(
        Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100),
      )
    ) {
      return 0;
    }
    return Math.floor((numberOfCompletedTasks / totalNumberOfTasks) * 100);
  };

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
              ? 'Done!  '
              : 'Tasks Progress  '}

            <small style={{ color: 'green' }}>
              {/* {totalNumberOfTasks === 0
                ? 0
                : Math.floor(
                    (numberOfCompletedTasks / totalNumberOfTasks) * 100,
                  )} */}
              {displayPercentage()}%
            </small>
          </h4>

          {showUserShare && (
            <>
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
            </>
          )}
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
