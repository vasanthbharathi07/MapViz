import {React,useState} from "react";
import {Button,Stack} from '@mui/material'
import MapComponent from "./MapComponent";

function HomePage() {

  const [electionMode, setElectionsMode] = useState(false);
  const [weatherMode, setWeatherMode] = useState(false);

  function onElectionModeClick(){
    setElectionsMode(true);
    setWeatherMode(false);
  }

  function onWeatherModeClick(){
    setElectionsMode(false);
    setWeatherMode(true);
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
        <Button variant="contained" onClick={onElectionModeClick} disabled={electionMode}>
          Elections
        </Button>
        <Button variant="contained" onClick={onWeatherModeClick} disabled={weatherMode}>
          Weather
        </Button>
      </Stack>
      <MapComponent />
    </>
  );
}

export default HomePage;
