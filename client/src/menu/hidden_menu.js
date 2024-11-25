import React, { useState } from "react"; 
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

    const hiddenMenuBnt = () => {
        setHiddenMenuOpen(!hiddenMenuOpen);
        setIsButtonActive(!isButtonActive);
    };

    function PMDetectionBox() {
        const formatDate = (rawDate) => {
            // rawDate: 2024-10-02_01-10-08_299946
            const [date, time] = rawDate.split('_');                        // "2024-10-02"와 "01-10-08_299946"로 분리
            const formattedTime = time.split('_')[0].replace(/-/g, ':');    // "01-10-08"에서 "01:10:08"로 변환
            return `${date}( ${formattedTime} )`;                           // 최종 출력 형식
        };
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (cctvData.length === 0) return <p>No Data Available</p>;
        
        return (
            <div className="table-container">
                {cctvData.map((item) => (
                    <table className="cctv-table"  onClick={() => setSelectedImage(item.image)}>
                        <tbody className="cctv-tbody">
                        <React.Fragment key={item.id}>
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
                                <td>{item.helmet ? "Yes" : "No"}</td>
                                <td className="field-label">중앙선 침범</td>
                                <td>{item.centerLine ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="field-label">2인 탑승</td>
                                <td>{item.people2 ? "Yes" : "No"}</td>
                                <td className="field-label">역주행</td>
                                <td>{item.wrongWay ? "Yes" : "No"}</td>
                            </tr>
                        </React.Fragment>
                        </tbody>
                    </table>
                ))}
            </div>
        );
    }

    function ImageComponent({ cctvName, imgName }) {
        const { imgURL, loading, error } = GetCCTVImg({ cctvName, imgName });

        if (loading) return <p>Loading image...</p>;
        if (error) return <p>Error loading image</p>;
        if (!imgURL) return <p>No Image</p>;

        return <img className="cctvimage" src={imgURL} alt="CCTV" />;
    }

    return (
        <>
            <button 
                className={`${hidden_menu_bnt} ${isButtonActive ? "active" : ""}`}
                onClick={hiddenMenuBnt}>
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
                    <PMDetectionBox />
                </div>
            </div>
        </>
            
    );
}

export default HiddenMenu;
