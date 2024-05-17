import React, { useEffect, useState } from "react";
import axios from "axios";
import HodNavBar from "../HodDashBord/HodNavBar";
import useTokenExpiry from "../../tokenExpireTime";

const AddCourse = () => {
  useTokenExpiry();

  const [department, setDepartment] = useState([]);
  const [input, setInput] = useState({
    admin_id: sessionStorage.getItem("id") || "",
    department_id: "",
    course: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/course/add", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        alert(response.data.message);
        setInput({
          ...input,
          department_id: "",
          course: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add course. Please try again.");
      });
  };

  const fetchDepartement = () => {
    axios
      .get("http://localhost:3001/dep/viewAll", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        setDepartment(response.data.depData);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  useEffect(() => {
    fetchDepartement();
  }, []);

  return (
    <div>
      <HodNavBar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="department_id" className="form-label">
              Department
            </label>
            <select
              name="department_id"
              id="department_id"
              value={input.department_id}
              onChange={handleInput}
              className="form-control"
            >
              <option value="">Select Department</option>
              {department.map((value) => (
                <option key={value._id} value={value._id}>
                  {value.department}
                </option>
              ))}
            </select>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={input.course}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={handleSubmit}>
              ADD COURSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
