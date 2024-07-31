import React from "react";
import { getUser } from "../../Services/userServices";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return getUser() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
