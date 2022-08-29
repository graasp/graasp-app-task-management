/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList
} from "recharts";
import qs from 'qs';

import { CONTAINER_HEIGHT } from '../../config/constants';

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />;
};


const { memberId } = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});


console.log('memberId: ',memberId)
const DashboardView =({students})=>{


    const data=[]

    students.map((student)=>data.push({name:student.name,  completed: 230, failed: 335, inprogress: 453 }))
    data.push({name:'Graciana',  completed: 435, failed: 335, inprogress: 567 })
    data.push({name:'Ella',  completed: 44, failed: 333, inprogress: 135 })
    data.push({name:"Alice",  completed: 20, failed: 675, inprogress: 331 })
    data.push({name:"Lynn",  completed: 556, failed: 223, inprogress: 432 })
    // const data = [
    //   { name: "NE Send", completed: 230, failed: 335, inprogress: 453 },
    //   { name: "NE Resend", completed: 335, failed: 330, inprogress: 345 },
    //   {
    //     name: "Miles Orchestrator",
    //     completed: 537,
    //     failed: 243,
    //     inprogress: 2110
    //   },
    //   {
    //     name: "Commissions Payment Orch",
    //     completed: 132,
    //     failed: 328,
    //     inprogress: 540
    //   },
    //   {
    //     name: "Business Integrators",
    //     completed: 530,
    //     failed: 145,
    //     inprogress: 335
    //   },
    //   { name: "SmartTrack", completed: 538, failed: 312, inprogress: 110 }
    // ];

    return (
      <>
        <h1>Dashboard</h1>
        <ResponsiveContainer height={CONTAINER_HEIGHT} width="95%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 50, right: 50 }}
            stackOffset="expand"
          >
            <XAxis hide type="number" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#FFFFFF"
              fontSize="12"
              tick={{ fill: 'black' }}
            />
            <Tooltip />
            <Bar dataKey="failed" fill="#dd7876" stackId="a">
              <LabelList
                dataKey="failed"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="completed" fill="#82ba7f" stackId="a">
              <LabelList
                dataKey="completed"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="inprogress" fill="#76a8dd" stackId="a">
              <LabelList
                dataKey="inprogress"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  
}



export default DashboardView




// for each member: {add,edit,delete}