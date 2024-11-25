import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GenericChart = ({ data, height, tooltipLabel }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => new Date(date).toLocaleDateString()} 
          hide={height === 50}
        />
        <YAxis hide={height === 50} />
        <Tooltip 
          formatter={(value, name) => [
            `${value}건`, 
            name === 'actual' ? '실제 데이터' : '예측 데이터'
          ]} 
        />
        {height > 50 && (
          <Legend 
            align="center"
            verticalAlign="bottom"
            height={36}
          />
        )}
        <Area 
          type="monotone" 
          dataKey="actual" 
          stroke="#1f77b4" 
          fill="#1f77b4" 
          name="실제 데이터"
          strokeWidth={2}
          connectNulls={true}
        />
        <Area 
          type="monotone" 
          dataKey="predicted" 
          stroke="#ff7f0e" 
          fill="#ff7f0e" 
          name="예측 데이터"
          strokeWidth={2}
          connectNulls={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GenericChart;