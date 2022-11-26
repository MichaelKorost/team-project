import React from 'react';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  //   checking for user takes time
  //so it instantaneously navigate to login in all cases
  //   //so it instantaneously navigate to login in all cases
  const { user } = useContext(AuthContext);
  // after bzilion changes this decided to work for no reason
  return user ? children : <Navigate to='/login' />;
}

export default RequireAuth;
