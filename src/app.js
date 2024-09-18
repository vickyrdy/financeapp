import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Expenses from './components/expenses';
import Settings from './components/settings';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Profile from './components/profile';
import SavingsGoal from './components/SavingsGoal';
import { fetchUserProfile } from './utils/api';
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AiAssistantPage from './components/AiAssistantPage';
import FinancialHealthCheckPage from './components/FinancialHealthCheckPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]); // Manage notifications in state

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserProfile()
        .then((profile) => {
          setUser(profile);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  // Add the addNotification function here
  const addNotification = (message) => {
    setNotifications([...notifications, { message, id: Date.now() }]);
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    fetchUserProfile()
      .then((profile) => setUser(profile))
      .catch(() => setIsAuthenticated(false));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="app-container">
            {isAuthenticated && <Sidebar />}
            <div className={isAuthenticated ? "main-content" : "auth-content"}>
              {isAuthenticated && <Topbar notifications={notifications} onLogout={handleLogout} />}
              <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/savings" element={<SavingsGoal addNotification={addNotification} />} /> {/* Passing addNotification */}
                <Route path="/expenses" element={isAuthenticated ? <Expenses user={user}/> : <Navigate to="/login" />} />
                <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
                <Route path="/ai-assistant" element={<AiAssistantPage />} />
                <Route path="/financial-health-check" element={<FinancialHealthCheckPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
