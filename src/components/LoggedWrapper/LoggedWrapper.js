import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import React from 'react';

// if user logged in prevent going to login
function LoggedInWrapper({ children }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to='/' /> : children;
}

export default LoggedInWrapper;
