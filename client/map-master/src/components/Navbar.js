import React, { useState } from 'react';
import { FaCar, FaBus, FaExclamationTriangle, FaFolderOpen, FaVideo } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import ReactPlayer from 'react-player'; // ReactPlayer 추가

function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCCTVPopupOpen, setIsCCTVPopupOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleCCTVPopup = () => {
    setIsCCTVPopupOpen(!isCCTVPopupOpen);
  };

  const menuItems = [
    { icon: <FaCar />, label: "주요도로 소통정보" },
    { icon: <FaBus />, label: "가로별 소통정보" },
    { icon: <FaExclamationTriangle />, label: "돌발/사고정보" },
    { icon: <FaFolderOpen />, label: "자료실" },
    { icon: <FaVideo />, label: "CCTV", onClick: toggleCCTVPopup },
  ];

  return (
    <nav style={{ backgroundColor: '#fff', color: '#000', padding: '10px' }}>
      {isMobile ? (
        <div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            {isMenuOpen ? '닫기' : '전체메뉴'}
          </button>
          {isMenuOpen && (
            <ul style={{ listStyle: 'none', padding: 0, backgroundColor: '#333', color: '#fff' }}>
              {menuItems.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #444' }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}
                    onClick={item.onClick ? item.onClick : () => toggleMenu(index)}
                  >
                    {item.icon}
                    <span style={{ marginLeft: '10px' }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto' }}>{openIndex === index ? '▲' : '▼'}</span>
                  </div>
                  {openIndex === index && (
                    <div style={{ padding: '10px', backgroundColor: '#444' }}>
                      <p>세부 정보</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: '10px', backgroundColor: '#fff', color: '#000' }}>
          {menuItems.map((item, index) => (
            <li key={index} style={{ marginRight: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={item.onClick ? item.onClick : null}>
              {item.icon} <span style={{ marginLeft: '5px' }}>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
      {isCCTVPopupOpen && (
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
          backgroundColor: '#fff',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 1000,
          width: '80%',
          maxWidth: '600px'
        }}>
          <h2>CCTV 정보</h2>
          <ReactPlayer
            url="http://211.34.248.240:1935/live/T065.stream/playlist.m3u8"
            playing
            controls
            width="100%"
            height="300px"
          />
          <button onClick={toggleCCTVPopup} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#333', color: '#fff' }}>닫기</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;