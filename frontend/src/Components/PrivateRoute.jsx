// PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";

const PrivateRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Return the element if user is authenticated and has required role
  return element;
};

export default PrivateRoute;
