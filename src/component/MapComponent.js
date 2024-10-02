import {React, useEffect, useState} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import DropDownComponent from './DropdownComponent';
import 'leaflet/dist/leaflet.css'

function MapComponent() {

  const [selectedGeoCoords, setSelectedGeoCoords] = useState([20.5937, 78.9629]);
  const [zoomLevel, setZoomLevel] = useState(5);

  useEffect(() =>{
    console.log('Changed Coords = ',selectedGeoCoords);
  },[selectedGeoCoords])

  function onPlaceSelectionChange(latitude,longitude,zoomlevel){
    setSelectedGeoCoords([latitude,longitude])
    setZoomLevel(zoomlevel)
  }

  return (
    <>
    <DropDownComponent onPlaceChange={onPlaceSelectionChange}/>
    <MapContainer
      key={selectedGeoCoords.join(",")} // Force remount on coordinate change
      center={selectedGeoCoords}  // Coordinates of India's center
      zoom={zoomLevel}  // Set the zoom level
      style={{ height: '100vh', width: '100%' }}  // Full-page map
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    </>
  );
  }

export default MapComponent;