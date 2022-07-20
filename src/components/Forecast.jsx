import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'
import { v4 as uuid} from 'uuid';

function Forecast({title, items}) {
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'> {title}</p>
        </div>
        <hr className='my-2' />
        <div className='flex flex-row items-center justify-between text-white'>
            {items.map(item => (
                <div key={uuid()} className='flex flex-col items-center justify-center'>
                    <p key={uuid()}  className=' font-light text-sm'>
                        {item.title}
                    </p>
                    <img src={iconUrlFromCode(item.icon)} className='w-12 my-1' alt="" />
                    
                    {item.tempNight ? (
                        <>
                            <p key={uuid()}  className='font-medium'>
                                Day: {`${item.temp.toFixed()}`}°
                            </p>
                        </>
                    ) : (<p key={uuid()}  className='font-medium'>Temp: {`${item.temp.toFixed()}`}°</p>)}

                    {item.tempNight && (
                        <>
                            <p key={uuid()}  className='font-medium'>
                                Night: {`${item.tempNight.toFixed()}`}°
                            </p>
                        </>
                    )}
                </div>
            ))}

        </div>
    </div>
  )
}

export default Forecast