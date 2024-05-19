import React from "react";
import {  Navigate, Outlet } from "react-router-dom";

const Hod = () => {
  let auth = sessionStorage.getItem("authenticated");
  return auth === "hod" ? <Outlet /> : <Navigate to="/" />;
};

export default Hod;
