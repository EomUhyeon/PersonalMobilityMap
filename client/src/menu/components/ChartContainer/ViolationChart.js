import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ViolationChart = ({ data }) => (
  <LineChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="violationCount" stroke="#8884d8" />
  </LineChart>
);

export default ViolationChart;