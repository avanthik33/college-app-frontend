import React, { useEffect } from "react";
import NavBar from "../NavBar";
import AdminCards from "../AdminDashBord/AdminCards";
import { useNavigate } from "react-router-dom";

const HodDash = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const expiryTime = sessionStorage.getItem("expiryTime");

  const handleTokenExpire = () => {
    if (token && expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expiryTime)) {
        sessionStorage.clear();
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
      <NavBar user="/hodDash" />
      <div className="container">
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add staff" link="/addStaff" />
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add subject" link="/addSub" />
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Allocate Subject" link="/subAllocation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDash;
