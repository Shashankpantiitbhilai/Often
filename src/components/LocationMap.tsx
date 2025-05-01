import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Location {
  name: string;
  position: [number, number];
  description?: string;
}

interface LocationMapProps {
  locations: Location[];
  center: [number, number];
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  locations, 
  center, 
  zoom = 10 
}) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg shadow-md overflow-hidden"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {locations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>
            <div>
              <h3 className="font-bold text-sm">{location.name}</h3>
              {location.description && <p className="text-xs mt-1">{location.description}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;