import React, { useEffect, useState } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const StaffProfile = () => {
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    qualification: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });
  const id = sessionStorage.getItem("id");
  const fetchData = (id) => {
    axios
      .get(`https://campus-9pqa.onrender.com/staff/profile/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed. Please try again.");
      });
  };

  const handleHide = () => {
    setHide(true);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    axios
      .put(`https://campus-9pqa.onrender.com/staff/update/${id}`, input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        alert(response.data.message);
        setInput({
          firstName: "",
          lastName: "",
          gender: "",
          qualification: "",
          address: "",
          email: "",
          phone: "",
          password: "",
        });
        fetchData(id);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed. Please try again.");
      });
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  useTokenExpiry();

  return (
    <div>
      <StaffNavBar />
      <div className="container-fluid">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="adminProfile">
              <div className="card adminProfileCard">
                <div className="card-header adminProfileCardHeader">
                  <h1 className="card-title adminProfileTitle">Profile</h1>
                </div>
                <div className="card-body adminProfilBody">
                  {data && (
                    <div>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>First Name : </strong> {data.firstName}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Last Name : </strong> {data.lastName}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Gender : </strong> {data.gender}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Qualification : </strong> {data.qualification}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Address : </strong> {data.address}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Email : </strong> {data.email}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Phone No : </strong> {data.phone}
                      </p>
                      <p
                        className="profile-item"
                        style={{ paddingTop: "30px" }}
                      >
                        <strong>Password : </strong> {data.password}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            {hide && (
              <div className="adminProfile">
                <div className="card adminProfileCard">
                  <div className="card-header adminProfileCardHeader">
                    <h1 className="card-title adminProfileTitle">
                      Update Profile
                    </h1>
                  </div>
                  <div className="card-body adminProfilBody">
                    {data && (
                      <div>
                        <label className="form-label">Fist Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.firstName}
                          name="firstName"
                          required
                          autoFocus
                          onChange={handleInput}
                        />
                        <label className="form-label">Last Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.lastName}
                          name="lastName"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Gender*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.gender}
                          name="gender"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Qualificaion*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.qualification}
                          name="qualification"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Address*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.address}
                          name="address"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Email*</label>
                        <input
                          type="email"
                          className="form-control"
                          value={input.email}
                          name="email"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Phone No*</label>
                        <input
                          type="number"
                          className="form-control"
                          value={input.phone}
                          name="phone"
                          required
                          onChange={handleInput}
                        />
                        <label className="form-label">Password*</label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.password}
                          name="password"
                          onChange={handleInput}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row g-3 justify-content-center">
          {!hide && (
            <button
              className="btn btn-success update-profile-btn"
              onClick={handleHide}
            >
              Update Profile
            </button>
          )}
          {hide && (
            <button
              className="btn btn-primary update-profile-btn"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
