import React from 'react';
import GraphAccident from './graph_accident.js'

const NationalStatus = () => {
  return (
    <div className="national-status" style={{ 
      width: '100%',
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    }}>
      <GraphAccident />
    </div>
  );
};

export default NationalStatus;
