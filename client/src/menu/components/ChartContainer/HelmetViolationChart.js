import React from 'react';
import GenericChart from './GenericChart';

const HelmetViolationChart = ({ data, height }) => (
  <GenericChart data={data} height={height} dataKey="trafficVolume" tooltipLabel="헬멧 미착용" />
);

export default HelmetViolationChart;