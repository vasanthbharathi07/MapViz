import axios from "axios";
import { WEATHER_API_BASE_URL } from "../constants/url_constants";
import { parseElectionData } from "../utils/utilities";
import { COUNTRY_NAME_US } from "../constants/AppConstants";

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


export async function fetchElectionResultsData(country, dataSource) {
  try {
    if (country === COUNTRY_NAME_US) {
      const response = await fetch("/resources/" + dataSource); // Assuming it's in the public/resources folder
      if (!response.ok) {
        throw new Error(`Failed to fetch election results data: ${response.statusText}`);
      }
      console.log('Response = ',response);
      const data = await response.text();
      const row_data = data?.split('\n');
      const electionDataList = row_data.map(parseElectionData);
      return electionDataList;
    }
  } catch (error) {
    console.error("Error fetching GeoJSON data:", error);
  }
}

export async function fetchGeoJsonData(country) {
  try {
    if (country === COUNTRY_NAME_US) {
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