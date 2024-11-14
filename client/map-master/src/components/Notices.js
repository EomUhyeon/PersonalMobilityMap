import React from 'react';

function Notices() {
  const notices = [
    "홈페이지 서비스 일시중단 안내",
    "CCTV 30개소 및 VMS 3개소 서비스 일시중단",
    "서변지하차도 전면통제 예정이니 우회 바랍니다",
    // ... 추가 공지사항
  ];

  return (
    <div style={{ width: '300px', padding: '10px', backgroundColor: '#f1f1f1' }}>
      <h2>공지사항</h2>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notices;