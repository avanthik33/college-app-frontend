import React, { useEffect, useState } from "react";
import AdminNavBar from "./NavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

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
        <div className="row g-3 mt-5">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="adminProfile">
              <div className="card adminProfileCard">
                <div className="card-header adminProfileCardHeader">
                  <h1 className="card-title adminProfileTitle">Profile</h1>
                </div>
                <div className="card-body adminProfilBody">
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
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
              </div>
            )}
          </div>
        </div>
        <div className="row g-3">
          {!hide && (
            <div
              className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
              style={{ textAlign: "center" }}
            >
              <button
                className="btn btn-primary update-profile-btn"
                onClick={handleHide}
              >
                Update Profile
              </button>
            </div>
          )}
          {hide && (
            <div
              className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
              style={{ textAlign: "center" }}
            >
            <button
              className="btn btn-success update-profile-btn"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
