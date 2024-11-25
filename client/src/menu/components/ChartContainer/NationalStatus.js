import React from 'react';

const NationalStatus = () => {
  return (
    <div className="national-status" style={{ 
      height: '270px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <p>전국 현황 데이터가 준비중입니다.</p>
    </div>
  );
};

export default NationalStatus;
