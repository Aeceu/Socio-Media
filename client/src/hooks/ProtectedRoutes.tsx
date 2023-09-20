/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import DataStore from "./DataStore";
import { useEffect } from "react";

const Auth = () => {
  const token = DataStore((state) => state.token);
  const getToken = DataStore((state) => state.getToken);

  useEffect(() => {
    getToken();
  }, [getToken]);
  return token;
};

export const ProtectedRoutes = () => {
  const isAuth = Auth(); // Use your Auth component or state management here

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoutes = () => {
  const isAuth = Auth(); // Use your Auth component or state management here

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};
