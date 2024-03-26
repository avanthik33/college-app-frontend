import React from "react";
import NavBar from "../NavBar";
import AdminCards from "./AdminCards";

const AdminDash = () => {
  return (
    <div>
      <NavBar user="/adminDash" />
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
