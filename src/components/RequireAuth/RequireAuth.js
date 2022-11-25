import React from 'react';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  //   checking for user takes time
  //so it instantaneously navigate to login in all cases

  return user ? children : <Navigate to='/login' />;
}

export default RequireAuth;
