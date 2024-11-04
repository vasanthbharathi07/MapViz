import React from "react";
import { CSV_2012_DATA_FILE_NAME, CSV_2016_DATA_FILE_NAME, CSV_2020_DATA_FILE_NAME,YEAR_2012, YEAR_2016, YEAR_2020 } from "../constants/AppConstants";


function DropDownComponent({ defaultValueList, listOfDropDownDataList,onSelectionChange }) {

    function handleSelectionChange(event) {
        if(event.target.value === YEAR_2012){
            onSelectionChange(CSV_2012_DATA_FILE_NAME);
        } else if(event.target.value === YEAR_2016) {
            onSelectionChange(CSV_2016_DATA_FILE_NAME);
        } else if(event.target.value === YEAR_2020){
            onSelectionChange(CSV_2020_DATA_FILE_NAME);
        }
    }

    function returnDropDownComponent(defaultValue, listData) {
        return (
            <div className="dropdown-container">
                <select onChange={handleSelectionChange}>
                    <option value="">{defaultValue}</option>
                    {listData && listData.map((data) => (
                        <option key={data} value={data}>
                            {data}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar">
                {defaultValueList && defaultValueList.map((defaultValue, index) => (
                    returnDropDownComponent(defaultValue, listOfDropDownDataList[index])
                ))}
            </div>
        </div>
    );

};

export default DropDownComponent;