import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const [department, setDepartment] = useState([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    department_id: "",
    qualification: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    fetch("http://localhost:3001/dep/viewAll", {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartment(data.depData);
      });
  }, []);
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
    axios
      .post("http://localhost:3001/staff/addStaff", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data.message);
        setInput({
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          department_id: "",
          qualification: "",
          address: "",
          email: "",
          phone: "",
          password: "",
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
        <div className="row">
          <h1>ADD STAFF</h1>
        </div>
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={input.firstName}
              name="firstName"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={input.lastName}
              name="lastName"
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
              Dob
            </label>
            <input
              type="date"
              className="form-control"
              value={input.dob}
              name="dob"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Department
            </label>
            <select
              name="department_id"
              id=""
              className="form-select"
              value={input.department_id}
              onChange={inputHandler}
            >
              <option value="" className="control"></option>
              {department.map((value, index) => {
                return (
                  <option key={value._id} value={value._id} className="control">
                    {value.department}
                  </option>
                );
              })}
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
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={input.address}
              name="address"
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
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              value={input.phone}
              name="phone"
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
              Add Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
