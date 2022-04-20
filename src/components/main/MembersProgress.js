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
import { CONTAINER_HEIGHT } from '../../config/constants';


const MembersProgress = ({ tasks, students, totalNumberOfTasks }) => {
  // in completed, I will see how many tasks are done by one student
  const st=students[0].name;
  console.log(st)
  const map1 = new Map();
  students.map((student) => map1.set(student.name, 0));
  const incrementCount = (label, arr, member) => {
    if (label === 'completed') {
      if (arr.includes(member.name)) {
        map1.set(member.name, (map1.get(member.name) + 1 / arr.length));
      }
    }
  };
  // eslint-disable-next-line no-restricted-syntax
  for (const student of students) {
    if (tasks._tail) {
      tasks._tail.array.forEach((task) => {
        incrementCount(task.data.label, task.data.members, student);
      });
    }
  } 

 
  
  // eslint-disable-next-line arrow-body-style
  const arr = Array.from(map1, ([key, participation]) => {
    return {'name':key,'participation':Math.floor((participation/totalNumberOfTasks)*100)};
  });
  
  console.log(arr);
  

  return (
    <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
      <BarChart
        width={500}
        height={300}
        data={arr}
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
        <Bar dataKey="participation" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MembersProgress;
