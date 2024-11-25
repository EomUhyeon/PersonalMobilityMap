import React from 'react';
import GenericChart from './GenericChart';

const ReverseDrivingChart = ({ data, height }) => (
  <GenericChart 
    data={data} 
    height={height} 
    tooltipLabel="역주행" 
  />
);

export default ReverseDrivingChart;