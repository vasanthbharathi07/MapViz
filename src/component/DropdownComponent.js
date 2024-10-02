    import {React,useRef} from 'react'
    //import { cities_data } from '../resources/cities-data';
    import countries_cities_state from '../resources/countries_states_cities.json'

    function DropDownComponent({onPlaceChange}){

        const selectedCountryRef = useRef(null);
        const selectedStateRef = useRef(null);
        const selectedCityRef = useRef(null);

        function handleCountryChange(event){
            const matched_country = countries_cities_state.find((country) => country.name === event.target.value)
            selectedCountryRef.current = matched_country
            onPlaceChange(matched_country.latitude,matched_country.longitude,5)
        }

        function handleStateChange(event){
            const matched_state = selectedCountryRef.current.states.find((state) => state.name === event.target.value)
            selectedStateRef.current = matched_state
            onPlaceChange(matched_state.latitude,matched_state.longitude,10)
        }

        function handleCityChange(event){
            const matched_city = selectedStateRef.current.cities.find((city) => city.name === event.target.value)
            selectedCityRef.current = matched_city
            onPlaceChange(matched_city.latitude,matched_city.longitude,13)
        }

        return(

            <div className='leaflet-top leaflet-right'>
                <div className='leaflet-control leaflet-bar'>
                <div className='dropdown-container'>
                    <select onChange={handleCountryChange}>
                        <option value="">
                            Select a Country
                        </option>
                        {countries_cities_state.map( (country) => (
                        <option key={country.name} value={country.name}>
                            {country.name}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className='dropdown-container'>
                    <select onChange={handleStateChange}>
                        <option value="">
                            Select a State or Province
                        </option>
                        {selectedCountryRef.current && selectedCountryRef.current.states.map( (state) => (
                        <option key={state.name} value={state.name}>
                            {state.name}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className='dropdown-container'>
                    <select onChange={handleCityChange}>
                        <option value="">
                            Select a City
                        </option>
                        {selectedStateRef.current && selectedStateRef.current.cities.map( (city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
            </div>

        );
    }

    export default DropDownComponent;