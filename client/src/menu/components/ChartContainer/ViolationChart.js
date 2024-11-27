import React, { useEffect, useState, useCallback } from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveNatural } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';
import PropTypes from 'prop-types';

const LoadingMessage = () => <p>로딩 중...</p>;
const NoDataMessage = () => <p>데이터가 없습니다.</p>;

const margin = { top: 20, right: 20, bottom: 50, left: 40 };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const validPayload = payload.find(p => p.value !== null);
    if (!validPayload) return null;

    const date = new Date(label);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const weekNum = Math.ceil(date.getDate() / 7);

    return (
      <div style={{ 
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '200px'
      }}>
        <p style={{ margin: '0 0 5px 0' }}>{`${year}년 ${month}월 ${weekNum}주`}</p>
        {payload.map((p, i) => (
          p.value !== null && (
            <p key={i} style={{ 
              margin: '3px 0',
              color: p.dataKey === 'actual' ? '#1f77b4' : '#ff7f0e',
              fontWeight: 'bold'
            }}>
              {p.dataKey === 'actual' ? '실제 위반 건수' : '예측 위반 건수'}: {Math.round(p.value)}건
            </p>
          )
        ))}
      </div>
    );
  }
  return null;
};

const normalizeViolationData = (csv) => {
  // 1. 날짜별 총 위반 건수 계산
  const dailyViolations = csv
    .trim()
    .split('\n')
    .slice(1)
    .map(line => {
      const [date, , , violationCount] = line.split(',');
      return { date, violationCount: parseInt(violationCount, 10) };
    })
    .reduce((acc, { date, violationCount }) => {
      acc[date] = (acc[date] || 0) + violationCount;
      return acc;
    }, {});

  // 2. 월 단위로 데이터 집계
  const monthlyViolations = {};
  Object.entries(dailyViolations).forEach(([date, count]) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    
    if (!monthlyViolations[monthKey]) {
      monthlyViolations[monthKey] = {
        count: 0,
        dates: []
      };
    }
    monthlyViolations[monthKey].count += count;
    monthlyViolations[monthKey].dates.push(date);
  });

  // 3. 최대/최소 위반 건수 찾기
  const counts = Object.values(monthlyViolations).map(v => v.count);
  const maxViolation = Math.max(...counts);
  const minViolation = Math.min(...counts);
  
  // 4. 편차를 줄이기 위한 스케일 계산 수정
  const scale = (80 - 20) / (maxViolation - minViolation);
  const normalize = (value) => {
    const normalized = 20 + (value - minViolation) * scale;
    return Math.max(30, normalized);
  };

  // 5. 모든 값을 새로운 스케일에 맞춰 조정하고 날짜 정렬
  const normalizedData = Object.entries(monthlyViolations)
    .map(([monthKey, data]) => ({
      date: data.dates[0], // 해당 월의 첫 날짜 사용
      monthLabel: monthKey,
      violationCount: Math.round(normalize(data.count))
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return normalizedData;
};

const ViolationChart = () => {
  const [dimensions, setDimensions] = useState({ width: 700, height: 350 });
  const [tooltipData, setTooltipData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedData, setFormattedData] = useState({ actual: [], predicted: [] });
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
      const csvText = await response.text();
      const normalizedData = normalizeViolationData(csvText);
      setData(normalizedData);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 데이터 분리
  useEffect(() => {
    if (data.length > 0) {
      const cutoffDate = new Date('2024-11-21');
      const endDate = new Date('2025-02-28');
      const actual = [];
      const predicted = [];

      data.forEach(item => {
        const date = new Date(item.date);
        if (date >= new Date('2023-12-15')) {
          if (date <= cutoffDate) {
            actual.push(item);
          } else if (date <= endDate) {
            predicted.push(item);
          }
        }
      });

      // 연결 지점 처리
      if (actual.length > 0) {
        const lastActualValue = actual[actual.length - 1].violationCount;
        const transitionPoint = {
          date: cutoffDate.toISOString().split('T')[0],
          violationCount: lastActualValue,
          monthLabel: `${cutoffDate.getFullYear()}-${(cutoffDate.getMonth() + 1).toString().padStart(2, '0')}`
        };
        
        // 실제 데이터의 마지막에 전환 지점 추가
        actual.push(transitionPoint);
        // 예측 데이터의 시작에 전환 지점 추가
        predicted.unshift(transitionPoint);
      }

      setFormattedData({ actual, predicted });
      setIsLoading(false);
    }
  }, [data]);

  // 반응형 설정
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.chart-section');
      if (container) {
        setDimensions({
          width: container.clientWidth - 60,
          height: container.clientHeight - 30
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const width = dimensions.width - margin.left - margin.right;
  const height = dimensions.height - margin.top - margin.bottom;

  const xScale = scaleTime({
    domain: [
      new Date('2023-12-15'),  // 시작 날짜를 12월 15일로 조정
      new Date('2025-02-28')
    ],
    range: [0, width]
  });

  const yScale = scaleLinear({
    domain: [30, 80],
    range: [height, 0],
    nice: true
  });

  const bisectDate = bisector(d => new Date(d.date)).left;
  
  const handleTooltip = (event) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = xScale.invert(x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - new Date(d0.date) > new Date(d1.date) - x0 ? d1 : d0;
    }

    const xPosition = xScale(new Date(d.date)) + margin.left;
    const yPosition = yScale(d.violationCount);
    
    // 툴팁이 화면을 벗어나는지 확인
    const isNearRightEdge = xPosition > dimensions.width - 100;
    const isNearLeftEdge = xPosition < 100;
    const isNearTop = yPosition < 100;

    let xOffset = 0;
    let yOffset = -80;  // 기본 y 오프셋

    // x축 위치 조정
    if (isNearRightEdge) {
      xOffset = -100;
    } else if (isNearLeftEdge) {
      xOffset = 0;
    }

    // y축 위치 조정
    if (isNearTop) {
      yOffset = 20;  // 팁을 아래로 표시
    }

    setTooltipData({
      ...d,
      isActual: new Date(d.date) <= new Date('2024-11-21'),
      xOffset,
      yOffset
    });
  };

  if (isLoading) return <LoadingMessage />;
  if (!data || data.length === 0) return <NoDataMessage />;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows 
            scale={yScale} 
            width={width} 
            strokeDasharray="3 3" 
            stroke="#e0e0e0" 
            strokeOpacity={0.2}
          />
          <GridColumns 
            scale={xScale} 
            height={height} 
            strokeDasharray="3,3" 
            stroke="#e0e0e0"
            strokeOpacity={0.3}
          />
          
          <AxisBottom 
            top={height} 
            scale={xScale} 
            numTicks={5}
            tickFormat={d => {
              const date = new Date(d);
              const year = date.getFullYear().toString().slice(2);
              const month = date.getMonth() + 1;
              return `${year}년 ${month}월`;
            }}
            stroke="#a8a8a8"
            tickStroke="#a8a8a8"
            tickLabelProps={() => ({
              fill: '#666',
              fontSize: 11,
              textAnchor: 'middle',
              dy: 8
            })}
          />
          <AxisLeft 
            scale={yScale}
            stroke="#a8a8a8"
            tickStroke="#a8a8a8"
            numTicks={5}
            tickLabelProps={() => ({
              fill: '#666',
              fontSize: 11,
              textAnchor: 'end',
              dx: -10,
              dy: 4
            })}
          />

          {/* 실제 데이터 라인 */}
          <AreaClosed
            data={formattedData.actual}
            x={d => xScale(new Date(d.date))}
            y={d => yScale(d.violationCount)}
            yScale={yScale}
            stroke="#1f77b4"
            fill="#1f77b4"
            fillOpacity={0.6}
            strokeWidth={2}
            curve={curveNatural}
            base={yScale(30)}
          />

          {/* 예측 데이터 라인 */}
          <AreaClosed
            data={formattedData.predicted}
            x={d => xScale(new Date(d.date))}
            y={d => yScale(d.violationCount)}
            yScale={yScale}
            stroke="#ff7f0e"
            fill="#ff7f0e"
            fillOpacity={0.6}
            strokeWidth={2}
            curve={curveNatural}
            strokeDasharray="4 4"
            base={yScale(30)}
          />

          <rect
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={handleTooltip}
            onMouseLeave={() => setTooltipData(null)}
          />

          {/* 하단 범례 */}
          <Group top={height + 45}>
            <Group left={width / 2 - 100}>
              <circle cx={0} cy={0} r={4} fill="#1f77b4" />
              <text 
                x={10} 
                y={4} 
                fontSize={11}
                fill="#666"
                style={{ fontWeight: '500' }}
              >
                실제 위반 건수
              </text>
              <circle cx={100} cy={0} r={4} fill="#ff7f0e" />
              <text 
                x={110} 
                y={4} 
                fontSize={11}
                fill="#666"
                style={{ fontWeight: '500' }}
              >
                예측 위반 건수
              </text>
            </Group>
          </Group>
        </Group>
      </svg>

      {tooltipData && (
        <Tooltip
          top={yScale(tooltipData.violationCount) + margin.top + tooltipData.yOffset}
          left={xScale(new Date(tooltipData.date)) + margin.left + tooltipData.xOffset}
          style={{
            ...defaultStyles,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transform: tooltipData.yOffset > 0 ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            zIndex: 999,
            pointerEvents: 'none'
          }}
        >
          <CustomTooltip 
            active={true} 
            payload={[{
              payload: tooltipData,
              value: tooltipData.violationCount
            }]} 
            label={tooltipData.date}
          />
        </Tooltip>
      )}
    </div>
  );
};

ViolationChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    violationCount: PropTypes.number.isRequired
  }))
};

export default ViolationChart;