import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchWeather} from '../../redux/weatherSlice';
import {styles} from './styles';

const WeatherScreen = () => {
  const [city, setCity] = useState<string>('');
  const dispatch = useDispatch();
  const {current, todayForecast, nextDaysForecast, loading} = useSelector(
    (state: RootState) => state.weather,
  );

  const handleFetchWeather = () => {
    dispatch(fetchWeather(city));
  };

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return 'sunny-outline';
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return 'cloud-outline';
      case 'rain':
        return 'rainy-outline';
      case 'thunderstorm':
        return 'thunderstorm-outline';
      case 'snow':
        return 'snow-outline';
      default:
        return 'cloud-outline';
    }
  };

  // Function to filter and get one forecast per day (e.g., closest to 12:00 PM)
  const filterDailyForecast = (forecasts: any[]) => {
    const dailyData: any[] = [];
    const groupedByDay = forecasts.reduce((acc, forecast) => {
      const date = moment(forecast.dt_txt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    }, {});

    Object.values(groupedByDay).forEach((dayForecast: any) => {
      // Get forecast closest to 12:00 PM or pick the first available one
      const middayForecast =
        dayForecast.find(
          (f: any) => moment(f.dt_txt).format('HH:mm') === '12:00',
        ) || dayForecast[Math.floor(dayForecast.length / 2)]; // Fallback to average entry
      dailyData.push(middayForecast);
    });

    return dailyData.slice(0, 5); // Limit to 5 days
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleFetchWeather} style={styles.button}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0288d1"
            style={styles.loading}
          />
        )}

        {/* Current Weather Section */}
        {current && (
          <View style={styles.weatherInfoContainer}>
            <View style={styles.currentWeatherContainer}>
              <Text style={styles.cityText}>{city}</Text>
              <Text style={styles.dateText}>
                {moment().format('dddd, MMM D')}
              </Text>
              <Text style={styles.temperatureText}>{current.main.temp}°C</Text>
              <Text style={styles.descriptionText}>
                <Icon
                  name={getWeatherIcon(current.weather[0].description)}
                  size={20}
                />{' '}
                {current.weather[0].description}
              </Text>
            </View>

            {/* Air Condition Section */}
            <View style={styles.airConditionContainer}>
              <Text style={styles.sectionTitle}>Air Conditions</Text>
              <View style={styles.conditionRow}>
                <Icon name="thermometer-outline" size={20} color="#4caf50" />
                <Text style={styles.conditionText}>
                  Real Feel: {current.main.feels_like}°C
                </Text>
              </View>
              <View style={styles.conditionRow}>
                <Icon name="speedometer-outline" size={20} color="#4caf50" />
                <Text style={styles.conditionText}>
                  Wind Speed: {current.wind.speed} m/s
                </Text>
              </View>
              <View style={styles.conditionRow}>
                <Icon name="cloud-outline" size={20} color="#4caf50" />
                <Text style={styles.conditionText}>
                  Clouds: {current.clouds.all}%
                </Text>
              </View>
              <View style={styles.conditionRow}>
                <Icon name="water-outline" size={20} color="#4caf50" />
                <Text style={styles.conditionText}>
                  Humidity: {current.main.humidity}%
                </Text>
              </View>
            </View>

            {/* Today's Forecast Section */}
            <View style={styles.todaysForecastContainer}>
              <Text style={styles.sectionTitle}>Today's Forecast</Text>
              {todayForecast.map((timeRange, index) => (
                <View key={index} style={styles.forecastRow}>
                  <Icon
                    name={getWeatherIcon(timeRange.weather[0].description)}
                    size={30}
                  />
                  <Text style={styles.forecastText}>
                    {moment(timeRange.dt_txt).format('HH:mm')} -{' '}
                    {timeRange.main.temp}°C, {timeRange.weather[0].description}
                  </Text>
                </View>
              ))}
            </View>

            {/* Weekly Forecast Section */}
            <View style={styles.weeklyForecastContainer}>
              <Text style={styles.sectionTitle}>Weekly Forecast</Text>
              {filterDailyForecast(nextDaysForecast).map((day, index) => (
                <View key={index} style={styles.forecastRow}>
                  <Icon
                    name={getWeatherIcon(day.weather[0].description)}
                    size={30}
                  />
                  <Text style={styles.forecastText}>
                    {moment(day.dt_txt).format('dddd')} - {day.main.temp}°C,{' '}
                    {day.weather[0].description}
                    {'\n'}
                    <Text style={styles.forecastDetails}>
                      Real Feel: {day.main.feels_like}°C | Wind:{' '}
                      {day.wind.speed} m/s | Clouds: {day.clouds.all}% |
                      Humidity: {day.main.humidity}%
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WeatherScreen;
