import React from 'react';
import GenericChart from './GenericChart';

const CenterLineViolationChart = ({ data, height }) => (
  <GenericChart 
    data={data} 
    height={height} 
    tooltipLabel="중앙선 침범" 
  />
);

export default CenterLineViolationChart;