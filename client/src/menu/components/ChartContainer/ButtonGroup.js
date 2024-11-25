import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ButtonGroup.css';

const BUTTONS = [
  { id: 'chart', label: '전체 위반' },
  { id: 'list', label: '위반 항목' },
  { id: 'national', label: '전국 현황' }
];

const ButtonGroup = ({ setView }) => {
  const [activeButton, setActiveButton] = useState('chart');

  const handleClick = useCallback((view) => {
    setActiveButton(view);
    setView(view);
  }, [setView]);

  return (
    <div className="button-group">
      {BUTTONS.map(({ id, label }) => (
        <button 
          key={id}
          className={activeButton === id ? 'active' : ''} 
          onClick={() => handleClick(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  setView: PropTypes.func.isRequired
};

export default ButtonGroup;