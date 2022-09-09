import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, LOCATION } from '../config';

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async ({ latitude, longitude }) => {
  const params = {
    lat: latitude,
    lon: longitude,
    appid: API_KEY,
  };
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
  return response.data;
});

export const getCurrentWeatherByLocation = createAsyncThunk('weather/getCurrentWeatherByLocation', async (city) => {
  const params = {
    q: city,
    appid: API_KEY,
  };
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
  return response.data;
});

export const getWeatherForecastDays = createAsyncThunk(
  'weather/getWeatherForecastDays',
  async ({ latitude, longitude }) => {
    const params = {
      id: 524901,
      lat: latitude,
      lon: longitude,
      appid: API_KEY,
    };
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast`,
      { params }
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: {},
    location: {
      latitude: LOCATION.latitude,
      longitude: LOCATION.longitude,
    },
    weatherForecastDays: {},
  },
  reducers: {
    updateLocation: (state, action) => {
      state.location = { ...action.payload };
    },
    updateWeather: (state, action) => {
      state.weather = { ...action.payload };
    },
  },
  extraReducers: {
    [getCurrentWeather.fulfilled]: (state, action) => {
      state.weather = action.payload;
    },
    [getCurrentWeatherByLocation.fulfilled]: (state, action) => {
      state.weather = action.payload;
      state.location = { latitude: action.payload.coord.lat, longitude: action.payload.coord.lon };
    },
    [getWeatherForecastDays.fulfilled]: (state, action) => {
      state.weatherForecastDays = action.payload;
    },
  },
});

export const { updateLocation, updateWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
