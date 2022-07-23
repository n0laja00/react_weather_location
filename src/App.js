import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery] = useState({q: 'Helsinki'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect (() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'Current location.'

      toast.info('Fetching weather for ' + message);

    await getFormattedWeatherData({...query, units}).then(data => 
      {
        toast.success(`successfully fetched weather for ${data.country}`);
        setWeather(data);
      });
    };
    fetchWeather();  
  }, [query, units])

  const formatBackround = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units ==='metric' ? 10 : 50
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  };

  return (
    <div className={`mx-auto max-w-screen-md mt-3 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackround()}`}> 
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>

          <Forecast title="Hourly forecast" items={weather.hourly}/>
          <Forecast title="Daily forecast" items={weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} position='top-right' pauseOnHover={false}/>
    </div>    
  );
}

export default App;
