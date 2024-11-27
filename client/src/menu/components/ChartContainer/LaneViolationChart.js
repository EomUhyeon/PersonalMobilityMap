import React from 'react';
import GenericChart from './GenericChart';

const LaneViolationChart = ({ data, height }) => (
  <GenericChart 
    data={data} 
    height={height} 
    tooltipLabel="1차선 주행" 
    maxValue={100}
  />
);

export default LaneViolationChart;