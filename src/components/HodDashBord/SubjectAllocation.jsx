import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubjectAllocation = () => {
  const [input, setInput] = useState({
    staff_id: "",
    subject_id: "",
  });
  const [staffs, setStaffs] = useState([]);
  const [selectedDep, setSelectedDep] = useState("");
  const hodId = sessionStorage.getItem("hodId");
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
