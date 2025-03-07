import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  viewMode: localStorage.getItem('viewMode') || 'list',
  sidebarOpen: true
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'card' : 'list';
      localStorage.setItem('viewMode', state.viewMode);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
});

export const { toggleTheme, toggleViewMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;