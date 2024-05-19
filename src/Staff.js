import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Staff = () => {
  let auth = sessionStorage.getItem("authenticated");
  return auth === "staff" ? <Outlet /> : <Navigate to="/" />;
};

export default Staff;
