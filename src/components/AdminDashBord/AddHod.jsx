import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";

const AddHod = () => {
  const [departments, setDepartments] = useState([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    department_id: "",
    qualification: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    axios.post("http://localhost:3001/hod/addHod", input).then((response) => {
      alert(response.data.status);
      setInput({
        firstName: "",
        lastName: "",
        gender: "",
        department_id: "",
        qualification: "",
        email: "",
        phoneNo: "",
        password: "",
      });
    });
  };
  useEffect(() => {
    fetch("http://localhost:3001/dep/viewAll")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setDepartments(data.depData);
        } else {
          console.error("Failed to fetch departments");
        }
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  return (
    <div>
      <NavBar user="/adminDash" />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              onChange={inputHandler}
              value={input.firstName}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={input.lastName}
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              value={input.gender}
              name="gender"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Department
            </label>
            <select
              id="department"
              name="department_id"
              value={input.department_id}
              onChange={inputHandler}
            >
              <option value=""></option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.department}
                </option>
              ))}
            </select>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Qualification
            </label>
            <input
              type="text"
              className="form-control"
              value={input.qualification}
              name="qualification"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={input.email}
              name="email"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Phone NO
            </label>
            <input
              type="number"
              className="form-control"
              value={input.phoneNo}
              name="phoneNo"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={input.password}
              name="password"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={submitHandler}>
              ADD HOD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHod;
