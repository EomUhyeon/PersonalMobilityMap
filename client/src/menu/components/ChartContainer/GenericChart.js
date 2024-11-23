import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GenericChart = ({ data, height, dataKey, tooltipLabel, strokeColor = "#8884d8", fillColor = "#8884d8" }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="date" 
        tickFormatter={(date) => new Date(date).toLocaleDateString()} 
        hide={height === 50}
      />
      <YAxis hide={height === 50} />
      <Tooltip formatter={(value) => [`${value}`, `${tooltipLabel} :`]} />
      <Legend />
      <Area type="monotone" dataKey={dataKey} stroke={strokeColor} fill={fillColor} />
    </AreaChart>
  </ResponsiveContainer>
);

export default GenericChart;