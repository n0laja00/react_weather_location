import React from 'react'
import { v4 as uuid} from 'uuid';

function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            title: 'Helsinki'
        },
        {
            id: 2,
            title: 'Berlin'
        },
        {
            id: 3,
            title: 'London'
        },
        {
            id: 4,
            title: 'Moscow'
        },
        {
            id: 5,
            title: 'Rome'
        },
    ]
  return (

    <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (
            <button key={uuid()} className='text-white text-lg font-medium' onClick={() => setQuery({ q: city.title })}>{city.title}</button>
        ))}

    </div>
  )
}

export default TopButtons