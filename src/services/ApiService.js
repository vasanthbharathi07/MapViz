import axios from "axios";
import { WEATHER_API_BASE_URL } from "../constants/url_constants";
import { parseElectionData } from "../utils/utilities";

export function getWeatherForGivenCity(cityName) {
  let apiUrl = WEATHER_API_BASE_URL + "/" + cityName;
  return axios
    .get(apiUrl)
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (error) {
      console.log("Error while hitting Weather API = ", error);
      throw error;
    });
}


export async function fetchElectionResultsData(country) {
  try {
    if (country === "United States Of America") {
      const response = await fetch("/resources/US_elections_2020_csv.csv"); // Assuming it's in the public/resources folder
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
      }
      const data = await response.text();
      const row_data = data?.split('\n');
      const electionDataList = row_data.map(parseElectionData);
      return electionDataList;
      //setElectionResultsData(electionDataList); // Set GeoJSON data in state
    }
  } catch (error) {
    console.error("Error fetching GeoJSON data:", error);
  }
}

export async function fetchGeoJsonData(country) {
  try {
    if (country === "United States Of America") {
      const response = await fetch("/resources/us-state-boundaries.geojson"); // Assuming it's in the public/resources folder
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
      }
      const data = await response.json();
      //setGeoJsonData(data); // Set GeoJSON data in state
      return data;
    }
  } catch (error) {
    console.error("Error fetching GeoJSON data:", error);
  }
}