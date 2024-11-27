import React, { useEffect, useState } from 'react';
import CompactChart from './CompactChart';
import ExpandedChart from './ExpandedChart';

const ViolationItem = ({ title, data, isExpanded, onToggle }) => {
  return (
    <li style={{ 
      height: isExpanded ? '379px' : '100%',
      overflow: 'hidden',                 /* 스크롤 제거 */
      transition: 'height 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span>{title}</span>
        <button style={{width: '30px', height: '30px'}} onClick={onToggle}>
          {isExpanded ? '-' : '+'}
        </button>
      </div>
      <div style={{ 
        height: isExpanded ? 'calc(100% - 40px)' : '25%',
        transition: 'height 0.3s ease'
      }}>
        {isExpanded ? (
          <ExpandedChart data={data} />
        ) : (
          <CompactChart data={data} />
        )}
      </div>
    </li>
  );
};

export default ViolationItem;