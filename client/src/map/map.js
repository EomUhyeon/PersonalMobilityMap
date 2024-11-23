import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import CCTVInfo from './data/cctv_info.json'
import TodayPercent from './data/pm_today_percent.json';

function Map({ getSearch, isEmptySearch, putPopup }) {
    const start_point = [35.861758, 128.571911];
    const start_zoom = 13;
    const [searchCCTV, setSearchCCTV] = useState(null);
    const markersRef = useRef({});

    useEffect(() => {
        if (!isEmptySearch()) {
            const cctvName = getSearch();
            const cctv = CCTVInfo.find(r => r.name === cctvName);

            if (cctv) {
                const lat = parseFloat(cctv.latitude);
                const lng = parseFloat(cctv.longitude);
                setSearchCCTV({ name: cctv.name, position: [lat, lng] });
            }
        }
    }, [getSearch, isEmptySearch]);

    const MapHandler = ({ searchCCTV }) => {
        const map = useMap();

        useEffect(() => {
            if (searchCCTV && markersRef.current[searchCCTV.name]) {
                const markerElement = markersRef.current[searchCCTV.name].getElement();
                markerElement.style.backgroundImage = `url(${require('./CCTV_off_30px.jpg')})`;
        
                const markerLatLng = markersRef.current[searchCCTV.name].getLatLng();

                map.setZoom(13, { animate: true });

                setTimeout(() => {
                    // 맵의 크기와 중심 계산
                    const mapSize = map.getSize();              // {x: width, y: height}
                    const centerOffsetX = mapSize.x * 0.25;     // 맵 너비의 25%만큼 오른쪽으로 이동
                    const centerOffsetY = 0;                    // 세로는 중앙 유지

                    // 이동할 픽셀 좌표 계산
                    const targetPoint = map.latLngToContainerPoint(markerLatLng);
                    const adjustedPoint = L.point(
                        targetPoint.x - centerOffsetX,
                        targetPoint.y - centerOffsetY
                    );

                    // 이동할 좌표를 위도/경도로 변환
                    const targetLatLng = map.containerPointToLatLng(adjustedPoint);

                    // 맵 이동
                    map.flyTo(targetLatLng, map.getZoom(), { animate: true });

                    // 팝업 열기
                    markersRef.current[searchCCTV.name].openPopup();

                    // 검색 상태 초기화
                    setSearchCCTV(null);
                }, 500); // 줌 변경 후 0.5초 뒤 위치 이동
            }
        }, [searchCCTV, map]);

        return null;
    }

    const percentCategory = (name) => {
        const cctv = TodayPercent.find(item => item.name === name);

        if (!cctv || !cctv.percent) {
            return '';
        }

        const percent = parseFloat(cctv.percent);

        if (percent >= 0 && percent <= 25) {
            return 'marker-25';
        } else if (percent > 25 && percent <= 50) {
            return 'marker-50';
        } else if (percent > 50 && percent <= 75) {
            return 'marker-75';
        } else if (percent > 75 && percent <= 100) {
            return 'marker-100';
        } else {
            return '';
        }
    };

    const handlePopupOpen = (name) => {
        const popupdata = [name]
        putPopup(popupdata);
        
        if (markersRef.current[name]) {
            const markerElement = markersRef.current[name].getElement();
            markerElement.style.backgroundImage = `url(${require('./CCTV_off_30px.jpg')})`;
    
            const map = markersRef.current[name]._map;

            map.setZoom(13, { animate: true });
    
            setTimeout(() => {
                const markerLatLng = markersRef.current[name].getLatLng();
    
                // 맵의 크기와 중심 계산
                const mapSize = map.getSize();              // {x: width, y: height}
                const centerOffsetX = mapSize.x * 0.25;     // 맵 너비의 25%만큼 오른쪽으로 이동
                const centerOffsetY = 0;                    // 세로는 중앙 유지
    
                // 이동할 픽셀 좌표 계산
                const targetPoint = map.latLngToContainerPoint(markerLatLng);
                const adjustedPoint = L.point(
                    targetPoint.x - centerOffsetX,
                    targetPoint.y - centerOffsetY
                );
    
                // 이동할 좌표를 위도/경도로 변환
                const targetLatLng = map.containerPointToLatLng(adjustedPoint);
    
                // 맵 이동
                map.flyTo(targetLatLng, map.getZoom(), { animate: true });
            }, 500);
        }
    };

    const handlePopupClose = (name) => {
        if (markersRef.current[name]) {
            const markerElement = markersRef.current[name].getElement();
            markerElement.style.backgroundImage = `url(${require('./CCTV_on_30px.jpg')})`;
        }
    };

    return (
        <MapContainer center={start_point} zoom={start_zoom} className="map-size">
            <MapHandler searchCCTV={searchCCTV} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {CCTVInfo.map((marker, index) => {
                return (
                    <Marker
                        icon={new L.DivIcon({
                            className: `custom-marker ${percentCategory(marker.name)}`,
                            iconSize: [30, 30],         // 크기
                            iconAnchor: [15, 15],       // 원의 중심 설정
                            popupAnchor: [2, -10],      // 팝업 위치
                        })}
                        key={index}
                        position={[parseFloat(marker.latitude), parseFloat(marker.longitude)]}
                        ref={(el) => {
                            if (el) {
                                markersRef.current[marker.name] = el;
                            }
                        }}
                        eventHandlers={{
                            popupopen: () => handlePopupOpen(marker.name),
                            popupclose: () => handlePopupClose(marker.name),
                        }}
                    >
                        <Popup>
                            {marker.name}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default Map;
