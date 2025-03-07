// In src/redux/slices/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  isLoading: false,
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.error = null;
      localStorage.setItem('tasks', JSON.stringify(action.payload));
    },
    fetchTasksFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    // Add this missing reducer
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    }
  }
});

// Make sure to export toggleTask here
export const { 
  fetchTasksStart, 
  fetchTasksSuccess, 
  fetchTasksFailure,
  addTask, 
  deleteTask, 
  updateTask,
  toggleTask
} = taskSlice.actions;

export default taskSlice.reducer;