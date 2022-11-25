import './App.css';
import LoginForm from './components/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import DonatePage from './components/DonatePage/DonatePage';
import AppointmentModal from './components/Modals/AppointmentModal/AppointmentModal';
import DonateDetailsModal from './components/Modals/DonateDetailsModal/DonateDetailsModal';
import ProfileForm from './components/profileForm/ProfileForm';
import ProfileEditModal from './components/Modals/ProfileEditModal/ProfileEditModal';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@mui/icons-material';
// import RequireAuth from './components/RequireAuth/RequireAuth';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to='/login' />;
    //   checking for user takes time
    //so it instantaneously navigate to login in all cases
  };

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path='/donate'
          element={
            <RequireAuth>
              <DonatePage />
            </RequireAuth>
          }
        />
        <Route
          path='/admin'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
