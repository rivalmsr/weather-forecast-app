import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ICONS } from '../config';
import { convertKelToCel, convertMSToKH, getObjectDate } from '../utilities';

const WeatherDisplay = (props) => {
  const [icon, setIcon] = useState('clouds');
  const { main, weather, wind, dt, sys, name } = props.weather;
  const currentDate = typeof dt === 'number' ? dt : dt.timestamp;
  const { day, month, date, time, year } = getObjectDate(currentDate);

  useEffect(() => {
    const _icon = ICONS[weather[0].main.toLowerCase()];
    setIcon(_icon);
  }, [weather]);

  return (
    <div className="w-full border-r">
      <div className="mt-10 flex item-center justify-center">
        <div className="text-right">
          <p className="mb-1 text-xs text-neutral-500 tracking-wider">{`${name} - ${sys.country}`}</p>
          <p className="text-base ml:text-lg md:tracking-wide text-neutral-500 font-medium ">{`${time}, ${day} ${month} ${date} ${year}`}</p>
        </div>
      </div>
      <div className="md:flex">
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
          <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
            <Image width={10} height={10} layout="responsive" src={`/${icon}.svg`} alt="weather icon" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start text-neutral-900">
          <div className="flex">
            <h4 className="text-4xl md:text-5xl lg:text-6xl font-bold">{`${convertKelToCel(main.temp)}`}</h4>
            <span className="font-bold">&#8451;</span>
          </div>
        </div>
      </div>
      <div className="mb-5 text-center">
        <h5 className="text-xl md:text-2xl text-neutral-900 font-bold">{weather[0].main}</h5>
        <p className="text-neutral-400 text-sm tracking-wider">{weather[0].description}</p>
      </div>
      <div className="md:flex text-center">
        <div className="w-full md:w-1/2">
          <p className="mb-1 text-neutral-500 tracking-wide">Humidity</p>
          <p className="text-lg text-neutral-800 font-medium">{main.humidity}%</p>
        </div>
        <div className="w-full md:w-1/2">
          <p className="mb-1 text-neutral-500 tracking-wide">Wind speed</p>
          <p className="text-lg text-neutral-800 font-medium">{`${convertMSToKH(wind.speed)} km/h`}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
