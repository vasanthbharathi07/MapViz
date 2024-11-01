
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faSnowflake, faCloudRain, faHurricane, faThunderstorm } from "@fortawesome/free-solid-svg-icons";

function getIconsBasedOnWeather({weatherDescription}){


    if(weatherDescription.toLowerCase().includes("sunny")){
        return <FontAwesomeIcon icon={faSun} /> 
    } else if(weatherDescription.toLowerCase().includes("snow")){
        return <FontAwesomeIcon icon={faSnowflake} />
    } else if(weatherDescription.toLowerCase().includes("cloudy")){
        return <FontAwesomeIcon icon={faCloud} />
    } else if(weatherDescription.toLowerCase().includes("rain")){
        return <FontAwesomeIcon icon={faThunderstorm} />
    }
}

export default getIconsBasedOnWeather;