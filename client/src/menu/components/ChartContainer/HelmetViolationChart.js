import React from 'react';
import GenericChart from './GenericChart';

const HelmetViolationChart = ({ data, height }) => (
  <GenericChart 
    data={data} 
    height={height} 
    tooltipLabel="헬멧 미착용" 
    maxValue={100}
  />
);

export default HelmetViolationChart;