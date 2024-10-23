import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ResuableMapTile from "./ReusableMapTile";
import CountrySelectionComponent from "./CountrySelectionComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import getIconsBasedOnWeather from "./IconFinder";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix the default icon issue by manually specifying the icon paths
delete L.Icon.Default.prototype._getIconUrl;

//TODO:: Add rain , severe heat , snow and ice icons 
//TODO:: Move the popup as a seperate component
//TODO:: Add 3 day forecast
//TODO:: Add weather mode as a mode for the map 
//TODO:: Add india states geojson
//TODO:: Add US states geojson
//TODO:: Explore use geospatial database
//TODO:: Add unit tests
//TODO:: Add github actions for build , eslint , unit tests


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function WeatherComponent() {
  const [selectedGeoCoords, setSelectedGeoCoords] = useState([
    20.5937, 78.9629,
  ]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [weatherData, setWeatherData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [temperatureData, setTemperatureData] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);

  useEffect(() => {
    //Debug use
  }, [selectedGeoCoords]);

  useEffect(() => {
    if (weatherData) {
      const windSpeed = weatherData.wind;
      const temperature = weatherData.temperature;
      const weatherDesc = weatherData.description;

      setWindData(`Wind Speed: ${windSpeed}`);
      setTemperatureData(`Temperature: ${temperature}`);
      setWeatherDescription(`Weather: ${weatherDesc}`);
    }
  }, [weatherData]); // Runs when weatherData changes


  function onPlaceSelectionChange(latitude, longitude, zoomlevel, weatherData) {
    setSelectedGeoCoords([latitude, longitude]);
    setZoomLevel(zoomlevel);
    setWeatherData(weatherData);
  }

  return (
    <>

      <CountrySelectionComponent
        onPlaceChange={onPlaceSelectionChange}
      />
      <MapContainer
        key={selectedGeoCoords.join(",")} // Force remount on coordinate change
        center={selectedGeoCoords} // Coordinates of India's center
        zoom={zoomLevel} // Set the zoom level
        style={{ height: "100vh", width: "100%" }} // Full-page map
      >
        <ResuableMapTile />
        <Marker position={selectedGeoCoords}>
          <Popup>
            {windData && temperatureData && weatherDescription &&
              <div>
                <p>
                  <FontAwesomeIcon icon={faWind} /> {windData}
                </p>
                <p>
                  <FontAwesomeIcon icon={faThermometerHalf} /> {temperatureData}
                </p>
                <p>
                  {/* Display sun or cloud based on weather condition */}
                  {weatherDescription && getIconsBasedOnWeather(weatherDescription)}
                </p>
              </div>
            }
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default WeatherComponent;
