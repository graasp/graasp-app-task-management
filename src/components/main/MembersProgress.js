/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
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

const MembersProgress = ({
  tasks,
  students,
}) => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const members = [];

  const incrementCount = (
    label,
    arr,
    member,
    contribution,
    contributions,
    nbOfAssignements,
  ) => {
    if (label === 'completed') {
      if (arr.includes(member.name)) {
        nbOfAssignements += 1;
        contribution = 1 / arr.length;
        contributions += contribution;
        console.log(nbOfAssignements)
      }
    }
  };
  

  // eslint-disable-next-line no-restricted-syntax
  for (const student of students) {
    const nbOfAssignements = 0;
    const contribution = 0;
    const contributions = 0;
    if (tasks._tail) {
      tasks._tail.array.forEach((task) => {
        incrementCount(
          task.data.label,
          task.data.members,
          student,
          contribution,
          contributions,
          nbOfAssignements,
        );
        const newStudent={
            name:student.name,
            total:nbOfAssignements,
            contributions

        }
        members.push(newStudent)
      });
    }
  }
 

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
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
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MembersProgress;
