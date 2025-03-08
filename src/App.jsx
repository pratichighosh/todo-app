import React, { useEffect, useState } from 'react';
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
  // Track viewport size to help with responsive decisions
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // This ensures that the path is set to root when the app loads
  useEffect(() => {
    // Only push to history if we're not already at the root
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      window.history.pushState({}, '', '/');
    }
  }, []);
  
  // Track window resize events to update mobile status
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wrapper component for protected routes that passes the isMobile prop
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return (
      <Layout isMobile={isMobile}>
        {children}
      </Layout>
    );
  };
  
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
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
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
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
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