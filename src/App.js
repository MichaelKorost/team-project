import './App.css';
import LoginForm from './components/Login/LoginForm';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import DonatePage from './components/DonatePage/DonatePage';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/RequireAuth';
import LoadingPage from './components/LoadingPage/LoadingPage';

import LoggedInWrapper from './components/LoggedWrapper/LoggedWrapper';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/login'
          element={
            <LoggedInWrapper>
              <LoginForm />
            </LoggedInWrapper>
          }
        />
        <Route path='/' element={<RequireAuth>{<HomePage />}</RequireAuth>} />
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
        {/* <Route path='*' element={<PageNotFound />} /> */}
        <Route path='*' element={<LoadingPage />} />
      </Routes>

      {/* <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/donate' element={<DonatePage />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes> */}
    </div>
  );
}

export default App;
