import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getWeatherData} from '../api/weatherAPI';

interface WeatherState {
  current: any;
  todayForecast: any[];
  nextDaysForecast: any[];
  loading: boolean;
}

const initialState: WeatherState = {
  current: null,
  todayForecast: [],
  nextDaysForecast: [],
  loading: false,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const data = await getWeatherData(city);
    return data;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWeather.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false;
      const forecastData = action.payload.list;

      // Get today's forecast (5 time ranges)
      const now = new Date();
      const today = forecastData
        .filter((entry: any) => {
          const entryDate = new Date(entry.dt * 1000);
          return (
            entryDate.getDate() === now.getDate() &&
            entryDate.getMonth() === now.getMonth()
          );
        })
        .slice(0, 5);

      // Get next 5 days forecast (daily data)
      const nextDaysForecast = forecastData.filter((entry: any) => {
        const entryDate = new Date(entry.dt * 1000);
        return (
          entryDate.getDate() > now.getDate() &&
          entryDate.getDate() <= now.getDate() + 5
        );
      });

      state.current = today[0]; // Current weather is the first entry of today
      state.todayForecast = today;
      state.nextDaysForecast = nextDaysForecast;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.current = null;
      state.todayForecast = [];
      state.nextDaysForecast = [];
    });
  },
});

export default weatherSlice.reducer;
