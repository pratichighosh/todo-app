// src/components/theme/ThemeProvider.jsx
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

const lightTheme = {
  colors: {
    background: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#4cd964',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    }
  }
};

const darkTheme = {
  colors: {
    background: '#222222',
    text: '#f5f5f5',
    textSecondary: '#a0a0a0',
    primary: '#4cd964',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    }
  }
};

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector(state => state.ui);
  
  return (
    <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;