import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [input, setInput] = useState({
    department: "",
    description: "",
  });
  const inputHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandle = () => {
    axios
      .post("http://localhost:3001/dep/addDep", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((resp) => {
        alert(resp.data.message);
        setInput({
          department: "",
          description: "",
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
      <NavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={input.department}
              onChange={inputHandle}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={input.description}
              onChange={inputHandle}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={submitHandle}>
              ADD department
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
