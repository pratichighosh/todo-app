import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  ui: uiReducer,
});

export default rootReducer;