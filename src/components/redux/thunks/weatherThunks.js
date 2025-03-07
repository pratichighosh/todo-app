import { setLoading, setError } from '../slices/uiSlice';
import weatherService from '../../services/weatherService';

// Action to fetch weather data
export const fetchWeather = (location) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const weatherData = await weatherService.getWeather(location);
    
    dispatch(setLoading(false));
    return { success: true, data: weatherData };
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.message || 'Failed to fetch weather data'));
    return { success: false, error: error.message };
  }
};