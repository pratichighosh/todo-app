import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherForLocation } from '../../services/weatherService';

export const fetchWeatherForTask = createAsyncThunk(
  'tasks/fetchWeatherForTask',
  async ({ taskId, location }, { rejectWithValue, dispatch, getState }) => {
    try {
      const weatherData = await getWeatherForLocation(location);
      
      // Find the task and update it with weather data
      const { tasks } = getState().tasks;
      const taskToUpdate = tasks.find(task => task.id === taskId);
      
      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          weather: weatherData
        };
        
        // Dispatch action to update the task with weather data
        dispatch(updateTask(updatedTask));
        
        return { taskId, weatherData };
      }
      
      return rejectWithValue('Task not found');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);