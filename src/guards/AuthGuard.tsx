import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuth = isAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
