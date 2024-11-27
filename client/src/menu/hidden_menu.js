import React, { useState, useEffect } from "react"; 
import ImageViewer from 'react-simple-image-viewer';
import "./css/hidden_menu.css";
import GetCCTVData from "./get_cctv_data.js";
import GetCCTVImg from "./get_cctv_img.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function HiddenMenu({ menuOpen, cctvInformation }) {
    const [hiddenMenuOpen, setHiddenMenuOpen] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const hidden_menu_bnt = menuOpen ? 'hidden_menu_bnt' : 'hidden_menu_bnt_closed';
    const hidden_menu = hiddenMenuOpen ? 'hidden_menu' : 'hidden_menu_closed';
    const [selectedImage, setSelectedImage] = useState(null);               // 선택된 이미지를 저장
    const { cctvData, loading, error } = GetCCTVData({ cctvName: cctvInformation });
    const [sortedData, setSortedData] = useState([]);
    const [activeButton, setActiveButton] = useState("violations");

    useEffect(() => {
        if (cctvData.length > 0) {
            handleClick("violations");
        }
    }, [cctvInformation, cctvData]);

    const hiddenMenuBnt = () => {
        setHiddenMenuOpen(!hiddenMenuOpen);
        setIsButtonActive(!isButtonActive);
        handleClick("violations");
    };

    const handleClick = (type) => {
        setActiveButton(type);
        sortData(type);        
    };

    // 데이터 정렬 함수
    const sortData = (type) => {
        if (!cctvData) return;

        let sorted = [...cctvData];
        if (type === "latest") {
            sorted.sort((a, b) => parseDateTime(b.date) - parseDateTime(a.date));
        } else if (type === "oldest") {
            sorted.sort((a, b) => parseDateTime(a.date) - parseDateTime(b.date));
        } else if (type === "violations") {
            sorted.sort((a, b) => {
                // 위반 개수를 계산
                const aCount = [a.wrongWay, a.centerLine, a.people2, a.helmet].filter(Boolean).length;
                const bCount = [b.wrongWay, b.centerLine, b.people2, b.helmet].filter(Boolean).length;
    
                // 위반 개수 기준으로 정렬
                if (bCount !== aCount) {
                    return bCount - aCount;
                }
    
                // 위반 개수가 같을 경우 특정 항목의 우선순위를 적용 (예: wrongWay > centerLine > people2 > helmet)
                const violationPriority = (item) => [
                    item.wrongWay ? 4 : 0,
                    item.centerLine ? 3 : 0,
                    item.people2 ? 2 : 0,
                    item.helmet ? 1 : 0,
                ].reduce((acc, val) => acc + val, 0);
    
                const aPriority = violationPriority(a);
                const bPriority = violationPriority(b);
    
                return bPriority - aPriority;
            });
        }
        setSortedData(sorted);
    };

    // 날짜 문자열을 시간으로 변환하는 함수
    const parseDateTime = (rawDate) => {
        // 날짜 문자열: "2024-10-02_08-11-53_846616"
        const [date, time] = rawDate.split('_'); // 날짜와 시간을 분리
        const formattedDateTime = `${date}T${time.split('_')[0].replace(/-/g, ':')}`;
        return new Date(formattedDateTime).getTime(); // 시간 값으로 반환
    };

    const PMDetectionBox = () => {
        const formatDate = (rawDate) => {
            // rawDate: 2024-10-02_01-10-08_299946
            const [date, time] = rawDate.split('_');                        // "2024-10-02"와 "01-10-08_299946"로 분리
            const formattedTime = time.split('_')[0].replace(/-/g, ':');    // "01-10-08"에서 "01:10:08"로 변환
            return `${date}( ${formattedTime} )`;                           // 최종 출력 형식
        };

        const ImageComponent = ({ cctvName, imgName }) => {
            const { imgURL, loading, error } = GetCCTVImg({ cctvName, imgName });
    
            if (loading) return <p>Loading image...</p>;
            if (error) return <p>Error loading image</p>;
            if (!imgURL) return <p>No Image</p>;
    
            return <img className="cctvimage" src={imgURL} alt="CCTV" />;
        }
    
        const displayData = sortedData.length > 0 ? sortedData : cctvData;
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!displayData || displayData.length === 0) return <p>No Data Available</p>;
        
        return (
            <div className="table-container">
                {displayData.map((item) => (
                    <table className="cctv-table"  onClick={() => setSelectedImage(item.image)} key={item.id}>
                        <tbody className="cctv-tbody">
                            <tr>
                                <td rowSpan="3" className="image-cell">
                                    <div className="image-container">
                                        <ImageComponent cctvName={item.cctvName} imgName={item.image} />
                                    </div>
                                </td>
                                <td className="field-label">날짜</td>
                                <td colSpan="3">{formatDate(item.date)}</td>
                            </tr>
                            <tr>
                                <td className="field-label">헬멧 미착용</td>
                                <td style={{ backgroundColor: item.helmet ? "#fff9cc" : "inherit" }}>
                                    {item.helmet ? "Yes" : "No"}</td>
                                <td className="field-label">중앙선 침범</td>
                                <td style={{ backgroundColor: item.centerLine ? "#ffcccc" : "inherit" }}>
                                    {item.centerLine ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="field-label">2인 탑승</td>
                                <td style={{ backgroundColor: item.people2 ? "#ffe2cc" : "inherit" }}>
                                    {item.people2 ? "Yes" : "No"}</td>
                                <td className="field-label">역주행</td>
                                <td style={{ backgroundColor: item.wrongWay ? "#ffcccc" : "inherit" }}>
                                    {item.wrongWay ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        );
    };

    const ImageComponent = ({ cctvName, imgName }) => {
        const { imgURL, loading, error } = GetCCTVImg({ cctvName, imgName });
        const [isViewerOpen, setIsViewerOpen] = useState(false);

        if (loading) return <p>Loading image...</p>;
        if (error) return <p>Loading image</p>;
        if (!imgURL) return <p>No Image</p>;

        const openImageViewer = () => setIsViewerOpen(true);
        const closeImageViewer = () => setIsViewerOpen(false);

        return (
            <div>
                <img
                    className="cctv_box_img"
                    src={imgURL}
                    alt="CCTV"
                    onClick={openImageViewer}                       // 클릭 시 이미지 뷰어 열기
                    style={{ cursor: 'pointer', width: '100', height: 'auto'}}
                />
                {isViewerOpen && (
                    <ImageViewer
                        src={[imgURL]}                              // 이미지 URL 배열
                        currentIndex={0}                            // 보여줄 이미지 인덱스
                        onClose={closeImageViewer}                  // 닫기 버튼 콜백
                        backgroundStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',  // 배경색 설정
                        }}
                        disableScroll={true}                        // 스크롤 비활성화
                        closeOnClickOutside={true}                  // 바깥 클릭 시 닫기
                    />
                )}
            </div>
        );
    }

    return (
        <>
            <button 
                className={`${hidden_menu_bnt} ${isButtonActive ? "active" : ""}`}
                onClick={hiddenMenuBnt}
            >
                상세 정보
            </button>
            <div className={hidden_menu}>
                <button className="left_menu_btn" onClick={hiddenMenuBnt}>
                    <div className="hidden_menu_arrow"></div>
                </button>
                <div className="cctv_img">
                    {selectedImage ? (
                        <ImageComponent cctvName={cctvInformation} imgName={selectedImage} />
                    ) : (
                        <p>Select an image to display</p>
                    )}
                </div>
                <div className="cctv_list">
                    <div className="sort-buttons">
                        <button
                            className={`sort-bnt ${activeButton === "latest" ? "active" : ""}`}
                            onClick={() => handleClick("latest")}
                        >
                            최신순
                        </button>
                        <button
                            className={`sort-bnt ${activeButton === "oldest" ? "active" : ""}`}
                            onClick={() => handleClick("oldest")}
                        >
                            오래된 순
                        </button>
                        <button
                            className={`sort-bnt ${activeButton === "violations" ? "active" : ""}`}
                            onClick={() => handleClick("violations")}
                        >
                            위반순
                        </button>
                    </div>
                    <PMDetectionBox />    
                </div>
            </div>
        </>
    );
}

export default HiddenMenu;
