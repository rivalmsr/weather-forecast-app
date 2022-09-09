import React from 'react';
import Image from 'next/image';

const TodayTabContent = ({ currentWeatherToday, getTimeAMPM }) => {
  return (
    <div className="m-auto mt-12">
      <div className="grid grid-cols-4 divide-x ">
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
    </div>
  );
};

export default TodayTabContent;
