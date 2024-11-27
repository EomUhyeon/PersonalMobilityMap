import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ViolationItem from './ViolationItem';
import { parseHelmetData, parseLaneViolationData, parseReverseDrivingData, parseCenterLineViolationData } from '../../utils';
import './ViolationList.css';

const ViolationList = () => {
  const [violationData, setViolationData] = useState({
    helmet: [],
    lane: [],
    reverseDriving: [],
    centerLine: []
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
      const csvText = await response.text();
      
      setViolationData({
        helmet: parseHelmetData(csvText),
        lane: parseLaneViolationData(csvText),
        reverseDriving: parseReverseDrivingData(csvText),
        centerLine: parseCenterLineViolationData(csvText)
      });
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleExpand = useCallback((index) => {
    setExpandedIndex(prev => prev === index ? null : index);
  }, []);

  const violationItems = useMemo(() => [
    { title: "헬멧 미착용", data: violationData.helmet },
    { title: "2인 탑승", data: violationData.lane },
    { title: "중앙선 침범", data: violationData.centerLine },
    { title: "역주행", data: violationData.reverseDriving }
  ], [violationData]);

  return (
    <div className="violation-list">
      <ul className='violation-ul'>
        {expandedIndex === null ? (
          violationItems.map((item, index) => (
            <ViolationItem
              key={index}
              title={item.title}
              data={item.data}
              isExpanded={false}
              onToggle={() => toggleExpand(index)}
            />
          ))
        ) : (
          <ViolationItem
            title={violationItems[expandedIndex].title}
            data={violationItems[expandedIndex].data}
            isExpanded={true}
            onToggle={() => toggleExpand(expandedIndex)}
          />
        )}
      </ul>
    </div>
  );
};

export default ViolationList;