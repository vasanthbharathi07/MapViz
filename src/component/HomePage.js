import { React, useState } from "react";
import { Button, Stack } from '@mui/material'
import WeatherComponent from "./WeatherComponent";
import ElectionsComponent from "./ElectionsComponent";

function HomePage() {

  const [electionMode, setElectionsMode] = useState(false);
  const [weatherMode, setWeatherMode] = useState(false);

  function onElectionModeClick() {
    setElectionsMode(true);
    setWeatherMode(false);
  }

  function onWeatherModeClick() {
    setElectionsMode(false);
    setWeatherMode(true);
  }

  function getModeName() {
    if (electionMode) {
      return 'Election';
    }
    if (weatherMode) {
      return 'Weather';
    }

    return null;
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onElectionModeClick} disabled={electionMode}>
          Elections
        </Button>
        <Button variant="contained" onClick={onWeatherModeClick} disabled={weatherMode}>
          Weather
        </Button>
      </Stack>
      {
        weatherMode &&
        <WeatherComponent />
      }
      {
        electionMode &&
        <ElectionsComponent />
      }
    </>
  );
}

export default HomePage;
