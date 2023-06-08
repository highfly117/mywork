import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, {Icon }from 'leaflet'

import "../../node_modules/leaflet/dist/leaflet.css"
import axios from 'axios';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

const WeatherMap = (props) => {
    const [weatherData, setWeatherData] = useState(null);

    const defaultIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41], 
        shadowSize: [41, 41], 
        iconAnchor: [12, 41], 
        shadowAnchor: [4, 62],  
        popupAnchor: [1, -34] 
      });

    const API_KEY = 'i0iQBy5pn2PzEj5BMD9ua43GDQkqIEZh';
    const DATA_FIELD = 'precipitationIntensity';
    const TIMESTAMP = (new Date()).toISOString();
    const position = [props.location.latitude, props.location.longitude]
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGlnaGZseTExNyIsImEiOiJjbGluNWR4amUwbDk5M2txcjcybTRpbGo0In0.pdrbNFR2lyks_o2aQizU9Q';
    const MAPBOX_URL = `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;

    return (
        <MapContainer 
          style={{width:'100%', height:'100%'}} 
          className="full-height-map"
          center={position}
          zoom={3}
          minZoom={3}
          maxZoom={19}
          maxBounds={[[-85.06, -180], [85.06, 180]]}
          scrollWheelZoom={true}
        >
          <ChangeView center={position} zoom={8} />
          <TileLayer
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
            url={MAPBOX_URL}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.tomorrow.io/weather-api">Powered by Tomorrow.io</a>'
            url={`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${API_KEY}`}
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      );
};

export default WeatherMap;
