import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const CompactChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={50}>
    <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} hide />
      <YAxis hide />
      <Area type="monotone" dataKey="trafficVolume" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
);

export default CompactChart;