import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function TrafficMap() {
  return (
    <div style={{ flex: 1, height: '500px' }}>
      <MapContainer center={[35.8714, 128.6014]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[35.8714, 128.6014]}>
          <Popup>대구광역시</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default TrafficMap;