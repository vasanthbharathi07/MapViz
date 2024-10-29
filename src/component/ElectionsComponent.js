import { React, useState, useEffect, useRef } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import ResuableMapTile from "./ReusableMapTile";
import LegendComponent from "./LegendComponent";
import {
  fetchElectionResultsData,
  fetchGeoJsonData,
} from "../services/ApiService";
import {
  geoJsonStyleDefault,
  geoJsonStyleDemocrats,
  geoJsonStyleRepublican,
  geoJsonStyleOthers,
} from "../utils/utilities";
import SideBoardComponent from "./SideBoardComponent";

import "leaflet/dist/leaflet.css";

function ElectionsComponent() {
  const selectedGeoCoords = [39.8283, -98.5795];
  const zoomLevel = 5;
  //TODO:: Right now adding only US state geojson data , in future plans to add India and Canada
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [electionResultsData, setElectionResultsData] = useState(null);
  const [currentSelectedState, SetCurrentSelectedState] = useState(null);

  const democratVotesRef = useRef(null);
  const republicanVotesRef = useRef(null);
  const otherVotesRef = useRef(null);


  //TODO::Loads the JSON at very first time,later will add this during a state change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGeoJsonData = await fetchGeoJsonData(
          "United States Of America"
        );
        setGeoJsonData(responseGeoJsonData);

        const responseElectionResultsData = await fetchElectionResultsData(
          "United States Of America"
        );
        setElectionResultsData(responseElectionResultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (geoJsonData) {
      console.log("GeoJSON Data Loaded: ", geoJsonData);
    }
    if (electionResultsData) {
      console.log("Election results Data Loaded: ", electionResultsData);
    }
  }, [geoJsonData, electionResultsData]);

  // Behaivour of the map color , opacity , background color and weight are set during the mouse hover
  // Once mouse enters a state geojson feature it will change color to orange
  //Once mouse coes out of the state then all the styles gets reverted back to old color
  const onEachStateMouseHover = (feature, layer) => {
    // Mouseover event: highlight the state
    layer.on("mouseover", function () {
      layer.setStyle({
        fillColor: "Green", // Change the color on hover
        fillOpacity: 0.7, // Adjust opacity
        weight: 2,
      });
    });

    // Mouseout event: reset to the original style
    layer.on("mouseout", function () {
      layer.setStyle(getStyleForState(feature.properties.name));
    });

    layer.on("click", function(){
      getElectionDataForGivenState(feature.properties.name);
    });
  };

  function getElectionDataForGivenState(stateName) {
    const voteData = {};
    const filteredData = electionResultsData.filter(
      (row) => row.state === stateName
    );


    if (filteredData && filteredData.length > 0) {
      console.log('Entering filteredData',filteredData[0]);
      democratVotesRef.current = filteredData[0]?.democratVotes;
      republicanVotesRef.current = filteredData[0]?.republicanVotes;
      otherVotesRef.current = filteredData[0]?.otherVotes;
      SetCurrentSelectedState(stateName);
    }

  }

  function getStyleForState(stateName) {
    const filteredData = electionResultsData.filter(
      (row) => row.state === stateName
    );
    if (filteredData.length === 0) {
      return geoJsonStyleDefault;
    }

    const matchedStateData = filteredData[0];
    if (matchedStateData.democratVotes > matchedStateData.republicanVotes) {
      return geoJsonStyleDemocrats;
    } else if (
      matchedStateData.democratVotes < matchedStateData.republicanVotes
    ) {
      return geoJsonStyleRepublican;
    } else if (
      matchedStateData.otherVotes >
      matchedStateData.republicanVotes + matchedStateData.democratVotes
    ) {
      return geoJsonStyleOthers;
    } else {
      return geoJsonStyleDefault;
    }
  }

  return (
    <>
      <MapContainer
        key={selectedGeoCoords.join(",")}
        center={selectedGeoCoords}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100%" }}
      >
        <ResuableMapTile />
        {electionResultsData && geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={(feature) => {
              const stateName = feature.properties.name; // Accessing the state's name from the feature's properties
              return getStyleForState(stateName); // Function that returns style based on the state name
            }}
            onEachFeature={onEachStateMouseHover}
          />
        )}
      </MapContainer>
      {currentSelectedState && democratVotesRef.current && republicanVotesRef.current && otherVotesRef.current &&
        <SideBoardComponent stateName={currentSelectedState} democratVotes={democratVotesRef.current} republicanVotes={republicanVotesRef.current} otherVotes={otherVotesRef.current} />
      }
       <LegendComponent />
    </>
  );
}

export default ElectionsComponent;
