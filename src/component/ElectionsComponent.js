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
import DropDownComponent from "./DropDownComponent";
import { COUNTRY_NAME_US, COLOR_GREEN, YEARS_LIST, DEFAULT_YEAR_VALUE, OPACITY_VALUE, WEIGHT_VALUE,CSV_2020_DATA_FILE_NAME,COUNTRY_US_LAT,COUNTRY_US_LONG } from "../constants/AppConstants";

import "leaflet/dist/leaflet.css";

function ElectionsComponent() {
  const selectedGeoCoords = [COUNTRY_US_LAT, COUNTRY_US_LONG];
  const zoomLevel = 5;
  //TODO:: Right now adding only US state geojson data , in future plans to add India and Canada
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(CSV_2020_DATA_FILE_NAME);
  const [electionResultsData, setElectionResultsData] = useState(null);
  const [currentSelectedState, SetCurrentSelectedState] = useState(null);

  const democratVotesRef = useRef(null);
  const republicanVotesRef = useRef(null);
  const otherVotesRef = useRef(null);
  const defaultValueForDropDown = [DEFAULT_YEAR_VALUE];

  //TODO::Loads the JSON at very first time,later will add this during a state change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGeoJsonData = await fetchGeoJsonData(
          COUNTRY_NAME_US
        );
        setGeoJsonData(responseGeoJsonData);
        const responseElectionResultsData = await fetchElectionResultsData(
          COUNTRY_NAME_US, selectedYear
        );
        setElectionResultsData(responseElectionResultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (geoJsonData) {
      console.log("GeoJSON Data Loaded: ", geoJsonData);
    }
    if (electionResultsData) {
      console.log("Election results Data Loaded: ", electionResultsData);
    }
  }, [geoJsonData, electionResultsData]);

  function onYearChange(dataSource) {
    setSelectedYear(dataSource);
  }

  // Behaivour of the map color , opacity , background color and weight are set during the mouse hover
  // Once mouse enters a state geojson feature it will change color to orange
  //Once mouse goes out of the state then all the styles gets reverted back to old color
  const onEachStateMouseHover = (feature, layer) => {
    // Mouseover event: highlight the state
    layer.on("mouseover", function () {
      layer.setStyle({
        fillColor: COLOR_GREEN, // Change the color on hover
        fillOpacity: OPACITY_VALUE, // Adjust opacity
        weight: WEIGHT_VALUE,
      });
    });

    // Mouseout event: reset to the original style
    layer.on("mouseout", function () {
      layer.setStyle(getStyleForState(feature.properties.name));
    });

    layer.on("click", function () {
      getElectionDataForGivenState(feature.properties.name);
    });
  };

  function getElectionDataForGivenState(stateName) {
    const voteData = {};
    const filteredData = electionResultsData.filter(
      (row) => row.state === stateName
    );

    if (filteredData && filteredData.length > 0) {
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
      <DropDownComponent
        defaultValueList={defaultValueForDropDown}
        listOfDropDownDataList={YEARS_LIST}
        onSelectionChange={onYearChange}
      />
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
      {currentSelectedState &&
        democratVotesRef.current &&
        republicanVotesRef.current &&
        otherVotesRef.current && (
          <SideBoardComponent
            stateName={currentSelectedState}
            democratVotes={democratVotesRef.current}
            republicanVotes={republicanVotesRef.current}
            otherVotes={otherVotesRef.current}
          />
        )}
      <LegendComponent />
    </>
  );
}

export default ElectionsComponent;
