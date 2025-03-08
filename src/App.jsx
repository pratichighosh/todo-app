import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeProvider from './components/theme/ThemeProvider';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import TasksPage from './components/pages/TasksPage';
import CalendarPage from './components/pages/CalendarPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import './app.css';

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // This ensures that the path is set to root when the app loads
  useEffect(() => {
    // Only push to history if we're not already at the root
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      window.history.pushState({}, '', '/');
    }
  }, []);
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Login route */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          
          {/* Root route - Dashboard */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Make exact path for index.html also go to Dashboard */}
          <Route
            path="/index.html"
            element={<Navigate to="/" replace />}
          />
          
          {/* Other protected routes */}
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <Layout>
                  <TasksPage />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/calendar"
            element={
              isAuthenticated ? (
                <Layout>
                  <CalendarPage />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Redirect any unknown routes to Dashboard for authenticated users or login for others */}
          <Route 
            path="*" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;