import React from "react";
import NavBar from "../NavBar";
import AdminCards from "../AdminDashBord/AdminCards";

const HodDash = () => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDash;
