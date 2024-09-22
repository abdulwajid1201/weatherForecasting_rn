import APIKit from './apiKit';

const API_KEY = 'a1864bbddd438e885441a76cd2754c32'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherData = async (city: string) => {
  const response = await APIKit().get(`${BASE_URL}`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });

  return response.data;
};
