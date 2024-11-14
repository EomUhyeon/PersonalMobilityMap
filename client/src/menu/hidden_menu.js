import React, { useEffect, useState} from "react"; 
import "./css/hidden_menu.css";

function HiddenMenu({ getPopup, isEmptyPopup }) {
    const [hiddenMenuOpen, setHiddenMenuOpen] = useState(false);
    const hidden_menu = hiddenMenuOpen ? 'hidden_menu' : 'hidden_menu_closed';
    const [cctvInformation, setCCTVInformation] = useState([]);

    useEffect(() => {
        if (!isEmptyPopup()) {
            const popupData = getPopup();
            setCCTVInformation(popupData);
        }
    }, [getPopup, isEmptyPopup]);

    const hiddenMenuBnt = () => {
        setHiddenMenuOpen(!hiddenMenuOpen);
    };

    return (
        <div className="hidden">
            <button className="hidden_menu_bnt" onClick={hiddenMenuBnt}>
                상세 정보
            </button>
            <div className={hidden_menu}>
                <div className="hidden_menu_left">

                </div>
                <div className="hidden_menu_right">
                    
                </div>
            </div>
        </div>
    )
}

export default HiddenMenu;
