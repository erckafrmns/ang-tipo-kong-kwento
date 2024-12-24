import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Check if the user is authenticated or accessing as a guest
  const isGuest = location.state?.isGuest || false;

  if (!token && !isGuest) {
    // Redirect to home if not authenticated and not a guest
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
