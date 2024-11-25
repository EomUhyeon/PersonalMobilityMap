import React from 'react';
import { Button } from 'react-bootstrap';
import CompactChart from './CompactChart';
import ExpandedChart from './ExpandedChart';

const ViolationItem = ({ title, data, isExpanded, onToggle }) => {
  return (
    <li style={{ marginBottom: '12px', marginTop: 0}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <Button variant="outline-primary" size="sm" onClick={onToggle}>
          {isExpanded ? '-' : '+'}
        </Button>
      </div>
      <div>
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