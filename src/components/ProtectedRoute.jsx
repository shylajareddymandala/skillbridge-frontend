import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // If the user is not logged in,
  // redirect them to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, allow the requested page.
  return children;
}

export default ProtectedRoute;