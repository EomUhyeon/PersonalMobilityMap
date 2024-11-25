import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const validPayload = payload.find(p => p.value !== null);
    if (!validPayload) return null;

    const isActual = validPayload.dataKey === 'actual';
    
    return (
      <div style={{ 
        backgroundColor: 'white', 
        padding: '10px', 
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0 }}>{new Date(label).toLocaleDateString()}</p>
        <p style={{ 
          margin: '5px 0 0 0', 
          color: isActual ? '#1f77b4' : '#ff7f0e',
          fontWeight: 'bold' 
        }}>
          {`${isActual ? '실제 위반 건수' : '예측 위반 건수'}: ${validPayload.value}건`}
        </p>
      </div>
    );
  }
  return null;
};

const CompactChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={30}>
    <AreaChart data={data} margin={{ top: 2, right: 20, left: 20, bottom: 2 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} hide />
      <YAxis hide />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="actual" 
        stroke="#1f77b4" 
        fill="#1f77b4" 
        name="실제 위반 건수"
        connectNulls={true}
      />
      <Area 
        type="monotone" 
        dataKey="predicted" 
        stroke="#ff7f0e" 
        fill="#ff7f0e" 
        name="예측 위반 건수"
        connectNulls={true}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default CompactChart;