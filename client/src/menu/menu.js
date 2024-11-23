import React, { useEffect, useState } from "react"; 
import ReactPlayer from 'react-player';
import "./css/menu.css";
import TodayPercent from './data/reservoir_today_percent.json';
import CCTVInfo from './cctv_info.json'
import ChartContainer from './components/ChartContainer/ChartContainer';
import GraphAccident from "./graph_accident.js"

function Menu({ putSearch, getPopup, isEmptyPopup }) {
    const [menuOpen, setMenuOpen] = useState(true);
    const left_menu = menuOpen ? 'left_menu' : 'left_menu left_menu_closed';
    const [cctvInformation, setCCTVInformation] = useState([]);

    useEffect(() => {
        if (!isEmptyPopup()) {
            const popupData = getPopup();
            setCCTVInformation(popupData);
        }
    }, [getPopup, isEmptyPopup]);

    const leftMenuBnt = () => {  
        setMenuOpen(!menuOpen);
    };

    // CCTV 검색창
    function Search() {
        const [searchTerm, setSearchTerm] = useState("");
    
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
        };
    
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                searchReservoir();
            }
        };

        const handleSearchClick = () => {
            searchReservoir();
        };

        const searchReservoir = () => {
            const filteredReservoirs = CCTVInfo.filter((reservoir) =>
                reservoir.name.includes(searchTerm)
            );
            if (filteredReservoirs.length > 0) {
                putSearch(filteredReservoirs[0].name);  // 첫 번째 결과 선택
            }
        };
    
        const filteredReservoirs = searchTerm
            ? CCTVInfo.filter((reservoir) =>
                reservoir.name.includes(searchTerm)
                ).slice(0, 10)
            : [];

        const handleReservoirClick = (reservoir) => {
            putSearch(reservoir.name);  
        };

        const percentCategory = (name) => {
            const reservoir = TodayPercent.find(item => item.name === name);
    
            if (!reservoir || !reservoir.percent) {
                return '';
            }
    
            const percent = parseFloat(reservoir.percent);
    
            if (percent >= 0 && percent <= 20) {
                return 'marker-20';
            } else if (percent > 20 && percent <= 40) {
                return 'marker-40';
            } else if (percent > 40 && percent <= 60) {
                return 'marker-60';
            } else if (percent > 60 && percent <= 80) {
                return 'marker-80';
            } else if (percent > 80 && percent <= 100) {
                return 'marker-100';
            } else {
                return '';
            }
        };

        return (
            <div className="search_box">
                <div className="search_bar">
                    <input
                        className="search_window"
                        type="text"
                        placeholder="CCTV를 검색 하세요."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress} 
                    />
                    <button className="search_bnt" onClick={handleSearchClick}></button>
                </div>
                <div className="search_data_box">
                    {searchTerm && (
                        <ul className="search_results_box">
                            {filteredReservoirs.length > 0 ? (
                                filteredReservoirs.map((reservoir, index) => (
                                    <div className="search_result">
                                        <div className={`today_persent ${percentCategory(reservoir.name)}`}></div>
                                        <li key={index} onClick={() => handleReservoirClick(reservoir)}>
                                            {reservoir.name} ({reservoir.위치})
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <li className="search_result">결과가 없습니다.</li>
                            )}
                        </ul>
                    )}
                </div>            
            </div>    
        );
    }

    const CCTVPlayer = ({ name }) => {
        const cctvName = Array.isArray(name) ? name[0] : name;
        const cctv = CCTVInfo.find(item => item.name === cctvName);
        const cctv_url = cctv ? cctv.link : '';

        return (
            <ReactPlayer
                url={cctv_url}
                controls            // 재생 컨트롤 표시
                playing={true}      // 자동 재생 설정
                muted={true}        // 음소거 여부
                width="100%"        // 플레이어 너비
                height="100%"       // 플레이어 높이
            />
        )
    }

    const ColorBar = () => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F3FF33"]; // 색상 배열
        const labels = ["58(전일+11)", "25(전일+4)", "12(전일-3)", "13(전일-5)", "11(전일-5)"]; // 숫자 배열

        return (
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              height: "50px",
              border: "1px solid black",
              overflow: "hidden",
            }}
          >
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {labels[index]}
                </span>
              </div>
            ))}
            
          </div>
        );
    };

    return (
        <div className="menu">
            <div className={left_menu}>
                <button className="left_menu_btn" onClick={leftMenuBnt}>
                    <div className={`arrow ${menuOpen ? 'open' : ''}`}></div>
                </button>
                <div className="cctv_box">
                    <CCTVPlayer name={cctvInformation}/>
                </div>
                <div className="left_menu_top">
                    {cctvInformation}
                </div>
                <div className="left_menu_mid">
                    기본 정보 페이지
                    <ChartContainer />
                    {/* <GraphAccident /> */}
                </div>
                <div className="left_menu_bot">
                    
                </div>
            </div>
            <div className="mid_menu">
                <div className="left_menu_top">
                    <Search />
                </div>
            </div>
            <div className="right_menu">
                (대구 광역시)개인형 이동장치 안전도
                <ColorBar />
                <div
                style={{
                    position: "absolute",
                    bottom: "-20px", // 하단으로 여백 추가
                    left: "0",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
                >
                안전
                </div>
                <div
                style={{
                    position: "absolute",
                    bottom: "-20px", // 하단으로 여백 추가
                    right: "0",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
                >
                위험
                </div>
            </div>
        </div>
    );
}

export default Menu;
