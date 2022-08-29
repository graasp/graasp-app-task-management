/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@material-ui/core';
import MembersProgress from './MembersProgressDetail';
import TeamProgressDetail from './TeamProgressDetail';
import MyCloud from './MyCloud';
import DashboardView from './Test';
// import Readability from './Readability';

const ChartsArea = ({
  tasks,
  students,
  totalNumberOfTasks,
  completedTasks,
  contributions,
  extraction_result,
  // sentence,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <MembersProgress
          tasks={tasks}
          students={students}
          totalNumberOfTasks={totalNumberOfTasks}
          contributions={contributions}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <TeamProgressDetail
          tasks={tasks}
          students={students}
          totalNumberOfTasks={totalNumberOfTasks}
          completedTasks={completedTasks}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        &nbsp;
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MyCloud sentence={extraction_result} />
      </Grid>

      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Readability sentence={sentence} />
      </Grid> */}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <DashboardView students={students} />
      </Grid>
    </Grid>
  );
};

export default ChartsArea;



