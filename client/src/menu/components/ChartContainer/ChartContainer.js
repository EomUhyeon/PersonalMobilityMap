import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ViolationChart from './ViolationChart';
import ViolationList from './ViolationList';
import NationalStatus from './NationalStatus';
import ButtonGroup from './ButtonGroup';
import './ChartContainer.css';
import { parseViolationData } from '../../utils';

const VIEWS = {
  CHART: 'chart',
  LIST: 'list',
  NATIONAL: 'national'
};

const ChartView = ({ data }) => (
  <div className="chart-section">
    <ViolationChart data={data} />
  </div>
);

const ListView = () => (
  <div className="list-section">
    <ViolationList />
  </div>
);

const ChartContainer = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(VIEWS.CHART);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
      const csvText = await response.text();
      const parsedData = parseViolationData(csvText);
      setData(parsedData);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = useMemo(() => 
    Object.entries(data).map(([date, violationCount]) => ({
      date,
      violationCount,
    })), [data]);

  const renderContent = () => {
    switch(view) {
      case VIEWS.CHART:
        return <ChartView data={chartData} />;
      case VIEWS.LIST:
        return <ListView />;
      case VIEWS.NATIONAL:
        return <NationalStatus />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <ButtonGroup setView={setView} />
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChartContainer;