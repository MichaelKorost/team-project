import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4756',
    },
    success: {
      main: '#2ed573',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='*' element={<App />}></Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>
);
