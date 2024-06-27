import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { MDBSpinner } from "mdb-react-ui-kit";

const SignIn = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const [loading, setLoading] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("https://campus-9pqa.onrender.com/admin/signin", input)
        .then((response) => {
          if (response.data.status === "success") {
            if (response.data.message === "Student login success") {
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem("expiryTime", response.data.expiryTime);
              sessionStorage.setItem("id", response.data.data._id);
              sessionStorage.setItem("authenticated", "student");
              navigate("/studentDash");
            } else if (response.data.message === "Admin login success") {
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem("expiryTime", response.data.expiryTime);
              sessionStorage.setItem("id", response.data.data._id);
              sessionStorage.setItem("authenticated", "admin");
              navigate("/adminDash");
            } else if (response.data.message === "Hod login success") {
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem("expiryTime", response.data.expiryTime);
              sessionStorage.setItem("id", response.data.data._id);
              sessionStorage.setItem("authenticated", "hod");

              sessionStorage.setItem(
                "department_id",
                response.data.data.department_id
              );
              navigate("/hodDash");
            } else if (response.data.message === "Staff login success") {
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem("expiryTime", response.data.expiryTime);
              sessionStorage.setItem("id", response.data.data._id);
              sessionStorage.setItem("authenticated", "staff");
              sessionStorage.setItem(
                "departmentId",
                response.data.data.department_id
              );
              navigate("/staffDash");
            } else {
              alert(response.data.message);
              setInput({ email: "", password: "" });
            }
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signin-container">
      <div className="container">
        <div className="row">
          <div className="banner">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <h1 className="signinBannerMainHeading">
                CAMPUS AUTOMATION SYSTEM
              </h1>
              <h4 className="signinBannerSecondaryHeading">
                ABCD COLLEGE KERALA
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <h1 className="signin">SIGNIN</h1>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <img
              src="https://image.shutterstock.com/image-photo/graduation-cap-earth-globe-concept-260nw-2349898783.jpg"
              alt=""
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="row g-3">
              <form onSubmit={submitHandle}>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={input.email}
                    name="email"
                    onChange={inputHandle}
                    placeholder="Email"
                    autoFocus
                    required
                  />
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={inputHandle}
                    value={input.password}
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <button className="btn btn-success" type="submit">
                    {loading ? (
                      <MDBSpinner role="status">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    ) : (
                      "SIGNIN"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
