import { FormatTextdirectionLToRSharp } from '@mui/icons-material';
import { getDialogUtilityClass } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import ProfileForm from './components/profileForm/ProfileForm';
// import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className='App'>
      {/* <LoginForm /> */}
      <ProfileForm />
    </div>
  );
}

export default App;
