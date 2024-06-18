import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
