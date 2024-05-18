import React from "react";
import StudentNav from "./StudentNav";
import useTokenExpiry from "../../tokenExpireTime";

const StudentProfile = () => {
  useTokenExpiry();

  return (
    <div>
      <StudentNav />
      <div className="container-fluid">
        <h1>PROFILE</h1>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
