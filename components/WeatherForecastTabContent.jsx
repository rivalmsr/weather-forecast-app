import React, { useState } from 'react';
import { convertKelToCel } from '../utilities';
import { useDispatch } from 'react-redux';
import { updateWeather } from '../redux/weatherSplice';

const WeatherForecastTabContent = ({ currentWeatherDays }) => {
  const [isActive, setIsActive] = useState('');
  const dispatch = useDispatch();

  const handleUpdateWeather = (_name, _weather) => {
    dispatch(updateWeather({ ..._weather }));
    setIsActive(_name);
  };

  return (
    <div className="w-full py-4 px-1">
      <ul>
        {Object.keys(currentWeatherDays).length > 0 &&
          Object.entries(currentWeatherDays).map(([name, data]) => (
            <li key={name}>
              <div
                onClick={() => handleUpdateWeather(name, data[0])}
                className={` ${
                  isActive === name ? 'bg-primary-300 text-white' : 'text-neutral-500'
                } group w-full h-auto py-3 px-8 mb-1 flex item-center rounded shadow transition ease-in-out hover:cursor-pointer hover:-translate-x-0.5 hover:bg-primary-300`}
              >
                <p className="group-hover:text-white w-1/4 flex text-sm">
                  <span className="w-10">{data[0].dt.day}</span>
                  {data[0].dt.time}
                </p>
                <p
                  className={`${
                    isActive === name ? 'text-white' : 'text-neutral-900'
                  } group-hover:text-white flex w-1/5 font-medium`}
                >
                  {convertKelToCel(data[0].main.temp)}
                  <span className="text-xs">&#8451;</span>
                </p>
                <p className="group-hover:text-white tracking-wider w-1/5">{data[0].weather[0].main}</p>
                <div className="w-2/5 flex items-center justify-end space-x-2">
                  {data[0].main.humidity >= 50 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`${
                        isActive === name ? 'text-white' : 'text-primary-300'
                      } w-6 h-6 group-hover:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`${
                        isActive === name ? 'text-white' : 'text-amber-500'
                      } w-6 h-6 group-hover:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                      />
                    </svg>
                  )}
                  <p className={`${isActive === name ? 'text-white' : 'text-neutral-900'} group-hover:text-white`}>
                    {data[0].main.humidity}%
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WeatherForecastTabContent;
