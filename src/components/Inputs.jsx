import React, { useState } from 'react';
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons'
import { v4 as uuid} from 'uuid';
import {  toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({q:city})
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!')
        let lat =position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    };
  };

  return (
    <>
        <div className=' flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 justify-center items-center space-x-4'>
                <input
                 type="text" name="search" id={uuid()} value={city} onChange={(e) => setCity(e.currentTarget.value)}
                 placeholder='Search...'  className='text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase'
                 />
                <UilSearch onClick={handleSearchClick} size={30} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
                <UilMapMarker size={30} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocationClick}/>
            </div>
            <div className='flex flex-row w-1/4 items-center justify-center'>
                <button onClick={handleUnitChange} name="metric" className='text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125'>°C</button>
                <p className='text-xl text-white mx-1'>|</p>
                <button onClick={handleUnitChange} name="imperial" className='text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125'>°F</button>
            </div>
        </div>  

    </>
  )
}

export default Inputs