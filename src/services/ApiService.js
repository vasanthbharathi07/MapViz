import axios from "axios";
import { WEATHER_API_BASE_URL } from "../constants/url_constants";

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
