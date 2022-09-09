import React from 'react';
import Image from 'next/image';

const TodayTabContent = ({ currentWeatherToday }) => {
  return (
    <div className="m-auto mt-12">
      <div className="grid grid-cols-4 divide-x">
        {currentWeatherToday.length > 0 &&
          currentWeatherToday.map((weather) => (
            <div key={weather.dt.timestamp} className="text-center text-neutral-500">
              <h4 className="text-neutral-600 font-bold tracking-wide">{`${weather.dt.day} ${weather.dt.date}`}</h4>
              <p className="text-sm">{weather.dt.time}</p>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20">
                  <Image width={10} height={10} layout="responsive" src={`/${weather.icon}.svg`} alt="weather icon" />
                </div>
              </div>
              <p>Humidity</p>
              <p className="text-neutral-600 font-medium">{weather.main.humidity}%</p>
            </div>
          ))}
      </div>
      <div className="mt-12 grid grid-cols-4">
        {currentWeatherToday.length > 0 &&
          currentWeatherToday.map((weather, index) => (
            <div key={index}>
              <div className="flex space-x-2 items-end">
                <div className="w-5 h-5">
                  <Image width={5} height={5} layout="responsive" src={`/water-waves.png`} alt="weather icon" />
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="hidden lg:inline">Sea </span>
                  {weather.main.sea_level} <span className="text-xs">hPa</span>
                </p>
              </div>
              <div className="mt-2.5 pb-1 flex space-x-2 items-end">
                <div className="w-5 h-5">
                  <Image width={5} height={5} layout="responsive" src={`/soil.png`} alt="weather icon" />
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="hidden lg:inline">Ground </span>
                  {weather.main.grnd_level} <span className="text-xs">hPa</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodayTabContent;
