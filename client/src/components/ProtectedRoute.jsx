import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  // Check if the user is authenticated or accessing as a guest
  const token = localStorage.getItem('authToken');
  const location = useLocation();
  const isGuest = location.state?.isGuest || false;

  // Redirect to home if not authenticated and not a guest
  if (!token && !isGuest) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;
