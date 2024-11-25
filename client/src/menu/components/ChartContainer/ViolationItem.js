import React from 'react';
import { Button } from 'react-bootstrap';
import CompactChart from './CompactChart';
import ExpandedChart from './ExpandedChart';

const ViolationItem = ({ title, data, isExpanded, onToggle }) => {
  return (
    <li style={{ marginTop: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <Button variant="outline-primary" size="sm" onClick={onToggle}>
          {isExpanded ? '-' : '+'}
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
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