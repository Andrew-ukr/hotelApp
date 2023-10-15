import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "../../Utils/constants";
import { selectAuth } from "../../Redux/Slices/authSlice";

const ProtectedRoutes = () => {
  const { user } = useSelector(selectAuth);
  const location = useLocation();

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={`/${LOGIN}`} state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
