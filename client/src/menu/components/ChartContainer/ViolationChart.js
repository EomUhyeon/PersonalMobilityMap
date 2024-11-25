import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import csv from 'csvtojson';
import PropTypes from 'prop-types';

const LoadingMessage = () => <p>로딩 중...</p>;

const NoDataMessage = () => <p>데이터가 없습니다.</p>;

const Tooltip = ({ point }) => (
  <div
    style={{
      background: 'white',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
  </div>
);

const ViolationChart = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
        const csvData = await response.text();
        const jsonData = await csv().fromString(csvData);

        const cutoffDate = new Date('2024-11-21');

        const actualData = jsonData
          .filter(item => new Date(item['날짜']) <= cutoffDate)
          .reduce((acc, item) => {
            const date = item['날짜'];
            acc[date] = (acc[date] || 0) + parseInt(item['위반 건수'], 10);
            return acc;
          }, {});

        const predictedData = jsonData
          .filter(item => new Date(item['날짜']) > cutoffDate)
          .reduce((acc, item) => {
            const date = item['날짜'];
            acc[date] = (acc[date] || 0) + parseInt(item['위반 건수'], 10);
            return acc;
          }, {});

        setFormattedData([
          {
            id: '실제 위반 건수',
            data: Object.entries(actualData).map(([date, count]) => ({ x: date, y: count })),
          },
          {
            id: '예측 위반 건수',
            data: Object.entries(predictedData).map(([date, count]) => ({ x: date, y: count })),
          },
        ]);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 270, backgroundColor: 'transparent', padding: '5px', width: '100%' }}>
      {isLoading ? (
        <LoadingMessage />
      ) : formattedData.length > 0 ? (
        <ResponsiveLine
          data={formattedData}
          margin={{ top: 25, right: 20, bottom: 45, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '위반 건수',
            legendOffset: -45,
            legendPosition: 'middle'
          }}
          colors={['#1f77b4', '#ff7f0e']}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={Tooltip}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 40,
              itemsSpacing: 20,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ],
              data: [
                {
                  id: '실제 위반 건수',
                  label: '실제 위반 건수',
                  color: '#1f77b4'
                },
                {
                  id: '예측 위반 건수',
                  label: '예측 위반 건수',
                  color: '#ff7f0e'
                }
              ]
            }
          ]}
        />
      ) : (
        <NoDataMessage />
      )}
    </div>
  );
};

ViolationChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    violationCount: PropTypes.number.isRequired
  })).isRequired
};

export default ViolationChart;