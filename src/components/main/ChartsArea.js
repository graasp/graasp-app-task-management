/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@material-ui/core';
import MembersProgress from './MembersProgress';
import ProgressPanel from './ProgressPanel';

const ChartsArea = ({ tasks, students, totalNumberOfTasks,completedTasks }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <MembersProgress
          tasks={tasks}
          students={students}
          totalNumberOfTasks={totalNumberOfTasks}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ProgressPanel
          tasks={tasks}
          students={students}
          totalNumberOfTasks={totalNumberOfTasks}
          completedTasks={completedTasks}

        />
      </Grid>
    </Grid>
  );
};

export default ChartsArea;
