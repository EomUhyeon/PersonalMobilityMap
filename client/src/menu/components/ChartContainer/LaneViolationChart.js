import React from 'react';
import GenericChart from './GenericChart';

const LaneViolationChart = ({ data, height }) => (
  <GenericChart data={data} height={height} dataKey="trafficVolume" tooltipLabel="1차선 주행" />
);

export default LaneViolationChart;