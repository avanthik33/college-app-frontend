import React, { useEffect, useState } from "react";
import HodNavBar from "./HodNavBar";
import axios from "axios";

const ViewCourseHod = () => {
  console.log(sessionStorage.getItem("department_id"));
  const [data, setData] = useState([]);
  const fetchCourse = () => {
    axios
      .post(
        "https://college-app-backend.onrender.com/course/viewCourseByDep",
        { department_id: sessionStorage.getItem("department_id") },
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      )
      .then((res) => {
        setData(res.data.data);
      });
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  console.log(data);
  return (
    <div>
      <HodNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>VIEW COURSES</h1>
        <hr />
        <br />
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              {data.map((value, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                    <div class="card courseHod">
                      <div class="card-body courseBodyHod">
                        <h5 class="card-title courseTitleHod">{value.course}</h5>
                        <hr />
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                          Department: {value.department_id.department}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseHod;
