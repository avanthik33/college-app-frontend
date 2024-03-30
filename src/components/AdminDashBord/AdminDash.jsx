import React, { useEffect } from "react";
import NavBar from "./NavBar";
import AdminCards from "./AdminCards";
import { useNavigate } from "react-router-dom";

function parseExpiryTime(expiryTime) {
  const numericPart = parseInt(expiryTime); // Extract numeric part
  const unit = expiryTime.replace(/\d/g, ""); // Extract unit part (e.g., "d" for days)

  // Define conversion factors for different units
  const conversionFactors = {
    d: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    h: 60 * 60 * 1000, // 1 hour in milliseconds
    m: 60 * 1000, // 1 minute in milliseconds
    s: 1000, // 1 second in milliseconds
    // Add more units if needed
  };

  // If the unit is known, convert and return
  if (unit in conversionFactors) {
    return numericPart * conversionFactors[unit];
  } else {
    throw new Error("Unsupported unit: " + unit);
  }
}

const AdminDash = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const expiryTime = sessionStorage.getItem("expiryTime");

  const presentTime = new Date().getTime();

  const handleTokenExpire = () => {
    if (token && expiryTime) {
      const expireTime = parseExpiryTime(expiryTime);
      const checkTime = presentTime + expireTime;
      if (Date.now() >= checkTime) {
        console.log("Token Expired. Redirecting...");
        sessionStorage.clear();
        navigate("/");
      } else {
        console.log("Token is still valid.");
      }
    } else {
      console.log("No token and expiry time available.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleTokenExpire, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <NavBar  />
      <div className="container-fluid">
        <div className="row">
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add department" link="/addDep" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Department" link="/viewDepartments" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add Hod" link="/addHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Hod" link="/viewHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Hod" link="/searchHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Staff" link="/viewStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Staff" link="/searchStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Course" link="/viewCourse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
