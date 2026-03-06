import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Optional: if you want to check expiry immediately

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  // Simple check: Does the token exist?
  if (!token) {
    // If no token, redirect to Login
    return <Navigate to="/login" replace />;
  }

  // OPTIONAL: Advanced Security (Requires 'npm install jwt-decode')
  // This checks if the token is totally expired before even rendering the page
  /*
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Token expired
        return <Navigate to="/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
  */

  // If token exists, render the protected component (Home)
  return children;
};

export default ProtectedRoute;