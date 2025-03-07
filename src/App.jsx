import React from 'react';
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
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/"
            element={
              isAuthenticated ? 
                <Layout>
                  <Dashboard />
                </Layout> : 
                <Navigate to="/login" />
            }
          />
          <Route
            path="/tasks"
            element={
              isAuthenticated ? 
                <Layout>
                  <TasksPage />
                </Layout> : 
                <Navigate to="/login" />
            }
          />
          <Route
            path="/calendar"
            element={
              isAuthenticated ? 
                <Layout>
                  <CalendarPage />
                </Layout> : 
                <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;