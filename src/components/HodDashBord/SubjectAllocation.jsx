import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
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

const SubjectAllocation = () => {
  const [input, setInput] = useState({
    staff_id: "",
    subject_id: "",
  });
  const [staffs, setStaffs] = useState([]);
  const [selectedDep, setSelectedDep] = useState("");
  const hodId = sessionStorage.getItem("id");
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    fetchDepartement();
  }, []);

  const fetchDepartement = () => {
    axios
      .get(`http://localhost:3001/hod/view/${hodId}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        const departmentName = response.data.data?.department_id?.department;
        if (departmentName) {
          setSelectedDep(departmentName);
          fetchStaff(departmentName);
          fetchSubject(departmentName);
        }
      });
  };

  const fetchStaff = (departmentName) => {
    axios
      .get("http://localhost:3001/staff/viewall", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        const departmentStaff = response.data.data.filter(
          (staff) => staff.department_id.department === departmentName
        );
        setStaffs(departmentStaff);
      });
  };
  const fetchSubject = (selectedDepartment) => {
    axios
      .get("http://localhost:3001/subject/viewall", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        const selectedSubject = response.data.data.filter(
          (subject) =>
            subject.course_id.department_id.department === selectedDepartment
        );
        setSubject(selectedSubject);
      });
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/subAllocation/allocate", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data.message);
        setInput({
          staff_id: "",
          subject_id: "",
        });
      });
  };

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
      <AdminNavBar user="/hodDash" />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            {selectedDep ? <h2>{selectedDep}</h2> : ""}
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              staff
            </label>
            <select
              name="staff_id"
              id=""
              className="form-control"
              value={input.staff_id}
              onChange={handleInput}
            >
              <option value=""></option>
              {staffs.map((value, index) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.firstName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Subject
            </label>
            <select
              name="subject_id"
              id=""
              className="form-control"
              onChange={handleInput}
              value={input.subject_id}
            >
              <option value=""></option>
              {subject.map((value, index) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.subject}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={handleSubmit}>
              Allocate subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectAllocation;
