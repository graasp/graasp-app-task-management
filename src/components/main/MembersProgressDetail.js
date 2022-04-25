/* eslint-disable no-import-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import { CONTAINER_HEIGHT } from '../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const MembersProgressDetail = ({ contributions }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(`Members' Contribution`)}
      </Typography>

      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <BarChart
          width={500}
          height={300}
          data={contributions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="memberContribution"
            fill="#8884d8"
            background={{ fill: '#eee' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MembersProgressDetail;
