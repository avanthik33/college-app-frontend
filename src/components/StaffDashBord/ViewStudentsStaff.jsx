import React, { useEffect, useState } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewStudentsStaff = () => {
  const [staffData, setStaffData] = useState({});
  const [studentData, setStudentData] = useState([]);

  const fetchStudentData = async (departmentId) => {
    // Accept departmentId as a parameter
    try {
      const response = await axios.post(
        "http://localhost:3001/student/viewByDep",
        { departmentId }, // Use the passed departmentId
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      setStudentData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/staff/profile/${sessionStorage.getItem("id")}`,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      setStaffData(response.data.data);

      const departmentId = response.data.data.department_id;
      await fetchStudentData(departmentId);
    } catch (error) {
      console.error("Failed to fetch staff data", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <div>
      <StaffNavBar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row">
              {studentData.map((value, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{value.firstName}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {value.email}
                        </h6>
                        <p className="card-text">{value.phoneNo}</p>
                        <Link to="#" className="card-link">
                          Search about student
                        </Link>
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