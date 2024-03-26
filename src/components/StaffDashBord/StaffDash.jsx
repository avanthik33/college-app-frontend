import React from "react";
import AdminNavBar from "../NavBar";
import AdminCards from "../AdminDashBord/AdminCards";

const StaffDash = () => {
  return (
    <div>
      <AdminNavBar user="/staffDash" />
      <div className="container">
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add Student" link="/addStudent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDash;
