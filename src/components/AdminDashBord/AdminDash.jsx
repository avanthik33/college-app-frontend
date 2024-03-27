import React, { useEffect } from "react";
import NavBar from "../NavBar";
import AdminCards from "./AdminCards";
import { useNavigate } from "react-router-dom";

const AdminDash = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const expiryTime = sessionStorage.getItem("expiryTime");

  const handleTokenExpire = () => {
    if (token && expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expiryTime)) {
        sessionStorage.clear()
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleTokenExpire, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <NavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        <div className="row">
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add department" link="/addDep" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add Hod" link="/addHod" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
