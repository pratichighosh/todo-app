import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherForLocation = async (location) => {
  try {
    // If using the demo key, return mock data
    if (API_KEY === 'demo_key') {
      return getMockWeatherData(location);
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return {
      location: response.data.name,
      temperature: response.data.main.temp,
      conditions: response.data.weather[0].main,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// Mock weather data for demo purposes
const getMockWeatherData = (location) => {
  const conditions = ['Clear', 'Cloudy', 'Rainy', 'Sunny', 'Stormy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * 30) + 5; // Random temp between 5-35°C
  
  return {
    location,
    temperature: randomTemp,
    conditions: randomCondition,
    icon: 'https://openweathermap.org/img/wn/10d@2x.png', // Default icon
    humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
    windSpeed: Math.floor(Math.random() * 20) + 1 // Random wind speed between 1-20 km/h
  };
};