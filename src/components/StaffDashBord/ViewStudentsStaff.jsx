import React, { useEffect, useState } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import useTokenExpiry from "../../tokenExpireTime";

const ViewStudentsStaff = () => {
  useTokenExpiry();

  const [staffData, setStaffData] = useState({});
  const [studentData, setStudentData] = useState([]);

  const fetchStudentData = async (departmentId) => {
    // Accept departmentId as a parameter
    try {
      const response = await axios.post(
        "https://college-app-backend.onrender.com/student/viewByDep",
        { departmentId }, // Use the passed departmentId
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      setStudentData(response.data.data);
      if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch student data", error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(
        `https://college-app-backend.onrender.com/staff/profile/${sessionStorage.getItem("id")}`,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      setStaffData(response.data.data);
      if (response.data.status === "error") {
        console.log(response.data.message);
      }

      const departmentId = response.data.data.department_id;
      await fetchStudentData(departmentId);
    } catch (error) {
      console.error("Failed to fetch staff data", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);
  console.log(studentData);
  return (
    <div>
      <StaffNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>VIEW STUDENTS</h1>
        <hr />
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              {studentData.map((value, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card students">
                      <div className="card-body studentsBody">
                        <h5 className="card-title studentsTitle">
                          {value.firstName}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {value.email}
                        </h6>
                        <p className="card-text studentText">{value.phoneNo}</p>
                        <p className="card-text studentText">
                          {value.course_id.course}
                        </p>
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

export default ViewStudentsStaff;
