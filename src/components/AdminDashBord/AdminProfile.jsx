import React, { useEffect, useState } from "react";
import AdminNavBar from "./NavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";
import "./AdminCard.css";

const AdminProfile = () => {
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const id = sessionStorage.getItem("id");

  const fetchData = (id) => {
    axios
      .get(`http://localhost:3001/admin/profile/${id}`, {
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
      .put(`http://localhost:3001/admin/update/${id}`, input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        alert(response.data.message);
        setInput({
          email: "",
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
  }, []);

  useTokenExpiry();
  return (
    <div>
      <AdminNavBar />
      <div className="container-fluid">
        <div className="row g-3 justify-content-center mt-5">
          <div className="col-sm-12 col-md-6">
            <div className="profile-card card">
              <div className="card-header">
                <h1 className="card-title">Profile</h1>
              </div>
              <div className="card-body">
                {data && (
                  <div>
                    <p className="profile-item">
                      <strong>Email:</strong> {data.email}
                    </p>
                    <p className="profile-item">
                      <strong>Password:</strong> {data.password}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            {hide && (
              <div className="profile-card card">
                <div className="card-header">
                  <h1 className="card-title">Update Profile</h1>
                </div>
                <div className="card-body">
                  {data && (
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={input.email}
                        name="email"
                        required
                        autoFocus
                        onChange={handleInput}
                      />
                      <label className="form-label">Password</label>
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
            )}
          </div>
        </div>
        <div className="row g-3 justify-content-center">
          {!hide && (
            <button
              className="btn btn-primary update-profile-btn"
              onClick={handleHide}
            >
              Update Profile
            </button>
          )}
          {hide && (
            <button
              className="btn btn-success save-changes-btn"
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

export default AdminProfile;
