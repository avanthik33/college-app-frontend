import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function parseExpiryTime(expiryTime) {
  const numericPart = parseInt(expiryTime); // Extract numeric part
  const unit = expiryTime.replace(/\d/g, ""); // Extract unit part (e.g., "d" for days)

  // Define conversion factors for different units
  const conversionFactors = {
    d: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    h: 60 * 60 * 1000, // 1 hour in milliseconds
    m: 60 * 1000, // 1 minute in milliseconds
    s: 1000, // 1 second in milliseconds
    // Add more units if needed
  };

  // If the unit is known, convert and return
  if (unit in conversionFactors) {
    return numericPart * conversionFactors[unit];
  } else {
    throw new Error("Unsupported unit: " + unit);
  }
}

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
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const expiryTime = sessionStorage.getItem("expiryTime");

  const presentTime = new Date().getTime();

  const handleTokenExpire = () => {
    if (token && expiryTime) {
      const expireTime = parseExpiryTime(expiryTime);
      const checkTime = presentTime + expireTime;
      if (Date.now() >= checkTime) {
        console.log("Token Expired. Redirecting...");
        sessionStorage.clear();
        navigate("/");
      } else {
        console.log("Token is still valid.");
      }
    } else {
      console.log("No token and expiry time available.");
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
            <div className="card h-100" style={{ width: "650px" }}>
              <div className="card-header">
                <h1 className="card-title" style={{ fontFamily: "fantasy" }}>
                  Profile
                </h1>
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
