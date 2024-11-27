import React from 'react';
import GenericChart from './GenericChart';

const ReverseDrivingChart = ({ data, height }) => (
  <GenericChart 
    data={data} 
    height={height} 
    tooltipLabel="역주행" 
    maxValue={100}
  />
);

export default ReverseDrivingChart;