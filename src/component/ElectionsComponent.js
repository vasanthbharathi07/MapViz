import { React, useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import ResuableMapTile from "./ReusableMapTile";

import "leaflet/dist/leaflet.css";

function ElectionsComponent() {

    const selectedGeoCoords = [39.8283, -98.5795,];
    const zoomLevel = 5
    //TODO:: Right now adding only US state geojson data , in future plans to add India and Canada
    const [geoJsonData, setGeoJsonData] = useState(null);

    // Function to fetch GeoJSON data
    //TODO:: Need to create a enum to handle the country names later during selection
    async function fetchGeoJsonData(country) {
        try {
            if (country === "United States Of America") {
                const response = await fetch("/resources/us-state-boundaries.geojson"); // Assuming it's in the public/resources folder
                if (!response.ok) {
                    throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
                }
                const data = await response.json();
                setGeoJsonData(data); // Set GeoJSON data in state
            }
        } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
        }
    }

    //TODO::Loads the JSON at very first time,later will add this during a state change 
    useEffect(() => {
        fetchGeoJsonData('United States Of America');
    }, []);

    
    useEffect(() => {
        if (geoJsonData) {
            console.log("GeoJSON Data Loaded: ", geoJsonData);
        }
    }, [geoJsonData]);

    // Default style of the state boundary based on geojson data
    const geoJsonStyleDefault = {
        fillColor: "LightSkyBlue",
        color: "black",
        weight: 1,
        fillOpacity: 0.5
    };

    // Behaivour of the map color , opacity , background color and weight are set during the mouse hover 
    // Once mouse enters a state geojson feature it will change color to orange
    //Once mouse coes out of the state then all the styles gets reverted back to old color
    const onEachStateMouseHover = (feature, layer) => {
        // Mouseover event: highlight the state
        layer.on("mouseover", function () {
            layer.setStyle({
                fillColor: "orange", // Change the color on hover
                fillOpacity: 0.7, // Adjust opacity
                weight: 2
            });
        });

        // Mouseout event: reset to the original style
        layer.on("mouseout", function () {
            layer.setStyle({
                fillColor: "LightSkyBlue", // Reset back to the original color
                fillOpacity: 0.5,
                weight: 1
            });
        });
    };

    return (
        <>
            <MapContainer
                key={selectedGeoCoords.join(",")}
                center={selectedGeoCoords}
                zoom={zoomLevel}
                style={{ height: "100vh", width: "100%" }}
            >
                <ResuableMapTile />
                {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyleDefault} onEachFeature={onEachStateMouseHover} />}
            </MapContainer>

        </>
    );
}

export default ElectionsComponent;