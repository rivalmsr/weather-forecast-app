import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSplice';

export const store = configureStore({
  reducer: { weather: weatherReducer },
});
