import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Récupérer l'utilisateur depuis le localStorage
  const userStr = localStorage.getItem("user");
  
  try {
    // Essayer de parser l'utilisateur comme JSON
    const user = userStr ? JSON.parse(userStr) : null;
    
    // Vérifier si l'utilisateur existe (pas besoin de vérifier le rôle)
    if (!user) {
      // Rediriger vers UserLogin au lieu de Login
      return <Navigate to="/UserLogin" replace />;
    }

    return children;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error);
    return <Navigate to="/UserLogin" replace />;
  }
};

export default ProtectedRoute;
