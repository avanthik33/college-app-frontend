import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  let auth = sessionStorage.getItem("authenticated");
  return auth === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default Admin;
