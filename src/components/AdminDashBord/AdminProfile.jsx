import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const id = sessionStorage.getItem("adminId");

  const fetchData = (id) => {
    axios
      .get(`http://localhost:3001/admin/profile/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        setData(response.data.data);
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
        alert(response.data.message);
        setInput({
          email: "",
          password: "",
        });
        fetchData(id);
      });
  };

  useEffect(() => {
    fetchData(id);
  }, []);
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
      <AdminNavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="card h-100"  style={{ width: "650px" }}>
              <div className="card-header">
                <h1 className="card-title">Profile</h1>
              </div>
              <div className="card-body">
                {data && (
                  <div>
                    <p className="profile-item">
                      <strong>Name:</strong> {data.email}
                    </p>
                    <p className="profile-item">
                      <strong>Password:</strong> {data.password}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            {hide && (
              <div className="card">
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
        <div className="row g-3">
          {!hide && (
            <button className="btn btn-success" onClick={handleHide}>
              Update Profile
            </button>
          )}
          {hide && (
            <button className="btn btn-primary" onClick={handleUpdateProfile}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
