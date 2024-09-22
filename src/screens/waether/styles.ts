import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    backgroundColor: '#f0f4f8', // Lighter background for modern look
    justifyContent: 'flex-start',
  },
  textInput: {
    height: height * 0.07,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#fff',
    fontSize: width * 0.045,
    color: '#333',
    marginBottom: height * 0.02,
  },
  button: {
    backgroundColor: '#0288d1', // Blue color for button
    paddingVertical: height * 0.02,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
  loading: {
    marginTop: height * 0.03,
  },
  weatherInfoContainer: {
    marginTop: height * 0.03,
    padding: width * 0.05,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  currentWeatherContainer: {
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  cityText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: width * 0.05,
    color: '#666',
    marginVertical: height * 0.01,
  },
  temperatureText: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#f57c00',
  },
  descriptionText: {
    fontSize: width * 0.045,
    color: '#4caf50',
    marginTop: height * 0.01,
  },
  airConditionContainer: {
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#333',
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  conditionText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.03,
    color: '#555',
  },
  todaysForecastContainer: {
    marginBottom: height * 0.03,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: height * 0.015,
  },
  forecastText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.03,
    color: '#333',
  },
  weeklyForecastContainer: {
    marginBottom: height * 0.03,
  },
  forecastDetails: {
    fontSize: width * 0.04,
    color: '#777',
    marginTop: height * 0.005,
  },
});
