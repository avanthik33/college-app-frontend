import React, { useEffect, useState } from "react";
import AdminNavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      <div className="container">
        <div
          className="row g-3"
          style={{
            marginTop: "20px",
          }}
        >
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div
              className="card"
              style={{
                width: "650px",
                height: "300px",
                backgroundColor: "lightgrey",
              }}
            >
              <div className="card-header">
                <h1 className="card-title" style={{ fontFamily: "fantasy" }}>
                  Profile
                </h1>
              </div>
              <div
                className="card-body"
                style={{
                  fontSize: "30px",
                  fontFamily: "inherit",
                }}
              >
                {data && (
                  <div>
                    <p className="profile-item">
                      <strong>Email : </strong> {data.email}
                    </p>
                    <p className="profile-item">
                      <strong>Password : </strong> {data.password}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            {hide && (
              <div
                className="card"
                style={{
                  width: "650px",
                  height: "300px",
                  backgroundColor: "lightgreen",
                }}
              >
                <div className="card-header">
                  <h1 className="card-title" style={{ fontFamily: "fantasy" }}>
                    Update Profile
                  </h1>
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
              className="btn btn-success"
              style={{
                fontFamily: "cursive",
                width: "170px",
                textAlign: "center",
                marginTop: "30px",
              }}
              onClick={handleHide}
            >
              Update Profile
            </button>
          )}
          {hide && (
            <button
              className="btn btn-primary"
              style={{
                fontFamily: "cursive",
                width: "160px",
                height: "50px",
                textAlign: "center",
                marginTop: "30px",
              }}
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
