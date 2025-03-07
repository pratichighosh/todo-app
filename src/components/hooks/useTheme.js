import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../redux/slices/uiSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);
  
  // Apply theme to body element
  useEffect(() => {
    document.body.className = theme;
    
    // Also apply CSS variables based on theme
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#1a1a1a');
      document.documentElement.style.setProperty('--text-color', '#f5f5f5');
      document.documentElement.style.setProperty('--card-bg', '#2a2a2a');
      document.documentElement.style.setProperty('--border-color', '#333333');
      document.documentElement.style.setProperty('--accent-color', '#4cd964');
    } else {
      document.documentElement.style.setProperty('--background-color', '#f5f5f5');
      document.documentElement.style.setProperty('--text-color', '#333333');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--border-color', '#e0e0e0');
      document.documentElement.style.setProperty('--accent-color', '#4cd964');
    }
  }, [theme]);
  
  const switchTheme = () => {
    dispatch(toggleTheme());
  };
  
  const changeTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };
  
  return {
    theme,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light',
    toggleTheme: switchTheme,
    setTheme: changeTheme,
  };
};

export default useTheme;