import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/uiSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <button 
      className="theme-toggle-button"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        backgroundColor: 'transparent', // Remove background color
        padding: '8px',
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        boxShadow: theme === 'light' 
          ? '0 4px 8px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1)' // Lighter shadow for 'light' mode
          : '0 4px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.1)', // Slightly darker shadow for 'dark' mode
        transition: 'all 0.2s ease'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
