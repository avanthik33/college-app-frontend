import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Student = () => {
  let auth = sessionStorage.getItem("authenticated");
  return auth === "student" ? <Outlet /> : <Navigate to="/" />;
};

export default Student;
