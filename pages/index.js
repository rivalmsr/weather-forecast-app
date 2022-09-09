import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainHead from '../components/MainHead';
import SearchLocation from '../components/SearchLocation';
import TabMenu from '../components/TabMenu';
import TodayTabContent from '../components/TodayTabContent';
import WeatherDisplay from '../components/WeatherDisplay';
import WeatherForecastTabContent from '../components/WeatherForecastTabContent';
import {
  getCurrentWeather,
  getCurrentWeatherByLocation,
  getWeatherForecastDays,
  updateLocation,
} from '../redux/weatherSplice';
import { getTimeAMPM, getObjectDate } from '../utilities';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentWeathers, setCurrentWeathers] = useState([]);
  const [currentWeatherToday, setCurrentWeatherToday] = useState([]);
  const [currentWeatherDays, setCurrentWeatherDays] = useState({});
  const [tabs] = useState([
    { name: 'Today', key: 'today' },
    { name: 'Weather Forecast', key: 'weather-forecast' },
  ]);
  const [tabActive, setTabActive] = useState('today');
  const dispatch = useDispatch();
  const { weather, weatherForecastDays, location } = useSelector((state) => state.weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      dispatch(updateLocation({ latitude: coords.latitude, longitude: coords.longitude }));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentWeather({ ...location }));
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(getWeatherForecastDays({ ...location }));
  }, [dispatch, location]);

  useEffect(() => {
    if (Object.keys(weather).length > 0) {
      setCurrentLocation(weather.name);
    }
  }, [weather]);

  useEffect(() => {
    if (Object.keys(weatherForecastDays).length > 0) {
      const { city } = weatherForecastDays;
      const _currentWeathers = weatherForecastDays.list.map((weather) => {
        const { day, month, date, time } = getObjectDate(weather.dt);
        const icon = weather.main.humidity >= 35 ? 'cloudy' : 'day';
        return {
          ...weather,
          dt: { timestamp: weather.dt, day, month, date, time },
          icon,
          name: city.name,
          sys: { country: city.country },
        };
      });
      setCurrentWeathers(_currentWeathers);
    }
  }, [weatherForecastDays]);

  useEffect(() => {
    if (currentWeathers.length > 0) {
      const _weathers = {};
      currentWeathers.map((weather) => {
        const { day, month, date } = weather.dt;
        const arrName = `${day}-${month}-${date}`;
        if (_weathers.hasOwnProperty(arrName)) _weathers[arrName].push(weather);
        else _weathers[arrName] = [weather];
      });
      setCurrentWeatherDays(_weathers);
      setCurrentWeatherToday(currentWeathers.slice(0, 4));
    }
  }, [currentWeathers]);

  const handleSearchLocation = () => {
    return dispatch(getCurrentWeatherByLocation(currentLocation.toLowerCase()));
  };

  const handleUpdateWeather = () => {
    return dispatch(getCurrentWeather({ ...location }));
  };

  const searchLocationProps = {
    currentLocation,
    setCurrentLocation,
    handleSearchLocation,
  };

  const tabMenuProps = {
    tabs,
    tabActive,
    setTabActive,
    handleUpdateWeather,
  };

  return (
    <>
      <MainHead />
      <main className="w-full py-12 px-8">
        {Object.keys(weather).length > 0 && (
          <div className="md:w-full lg:w-[65rem] m-auto py-8 px-6 flex space-x-2 bg-white rounded-md shadow-md">
            <div className="w-4/12">
              <SearchLocation {...searchLocationProps} />
              <WeatherDisplay weather={weather} />
            </div>
            <div className="w-8/12">
              <TabMenu {...tabMenuProps} />
              <div>
                {tabActive === 'today' ? (
                  <TodayTabContent currentWeatherToday={currentWeatherToday} getTimeAMPM={getTimeAMPM} />
                ) : (
                  <WeatherForecastTabContent currentWeatherDays={currentWeatherDays} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
