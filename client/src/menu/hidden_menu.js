import React, { useEffect, useState } from "react"; 
import "./css/hidden_menu.css";
import GetCCTVData from "./get_cctv_data.js";
import GetCCTVImg from "./get_cctv_img.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChartContainer from './components/ChartContainer/ChartContainer';

function HiddenMenu({ getPopup, isEmptyPopup }) {
    const [hiddenMenuOpen, setHiddenMenuOpen] = useState(false);
    const hidden_menu = hiddenMenuOpen ? 'hidden_menu' : 'hidden_menu_closed';
    const [cctvInformation, setCCTVInformation] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지를 저장

    const { cctvData, loading, error } = GetCCTVData({ cctvName: cctvInformation });

    useEffect(() => {
        if (!isEmptyPopup()) {
            const popupData = getPopup();
            setCCTVInformation(popupData);
        }
    }, [getPopup, isEmptyPopup]);

    const hiddenMenuBnt = () => {
        setHiddenMenuOpen(!hiddenMenuOpen);
    };

    function PMDetectionBox() {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (cctvData.length === 0) return <p>No Data Available</p>;
    
        return (
            <ul>
                {cctvData.map((item) => (
                    <li
                        key={item.id}
                        className="list-item"
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => setSelectedImage(item.image)} // 클릭 시 이미지 설정
                    >
                        <div className="image-container" style={{ marginRight: '10px' }}>
                            <ImageComponent cctvName={item.cctvName} imgName={item.image} />
                        </div>
                        <div className="text-container">
                            <p><strong>Date:</strong> {item.date}</p>
                            <p><strong>Helmet:</strong> {item.helmet ? "Yes" : "No"}</p>
                            <p><strong>First Lane:</strong> {item.firstLane ? "Yes" : "No"}</p>
                            <p><strong>Wrong Way:</strong> {item.wrongWay ? "Yes" : "No"}</p>
                            <p><strong>Center Line:</strong> {item.centerLine ? "Yes" : "No"}</p>
                        </div>
                    </li>
                ))}
            </ul>
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
        <div className="hidden">
            <button className="hidden_menu_bnt" onClick={hiddenMenuBnt}>
                상세 정보
            </button>
            <div className={hidden_menu}>
                <div className="hidden_menu_left">
                    <div className="cctv_img">
                        {selectedImage ? (
                            <ImageComponent cctvName={cctvInformation} imgName={selectedImage} />
                        ) : (
                            <p>Select an image to display</p>
                        )}
                    </div>
                    <div className="cctv_graph">
                        <Header />
                        <ChartContainer />
                        <Footer />
                    </div>
                </div>
                <div className="hidden_menu_right">
                    <div className="cctv_list">
                        <PMDetectionBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HiddenMenu;
