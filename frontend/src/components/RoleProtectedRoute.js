import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  // Get user from localStorage
  const userStr = localStorage.getItem("user");
  
  try {
    // Try to parse user as JSON
    const user = userStr ? JSON.parse(userStr) : null;
    
    // Check if user exists and has the required role
    if (!user) {
      return <Navigate to="/UserLogin" replace />;
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate page based on role
      if (user.role === "admin") {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }

    return children;
  } catch (error) {
    console.error("Error during authentication check:", error);
    return <Navigate to="/UserLogin" replace />;
  }
};

export default RoleProtectedRoute; 