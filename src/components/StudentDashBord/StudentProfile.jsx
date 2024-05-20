import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import useTokenExpiry from "../../tokenExpireTime";
import axios from "axios";

const StudentProfile = () => {
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleHide = () => {
    setHide(true);
  };

  const id = sessionStorage.getItem("id");
  const fetchData = () => {
    axios
      .post(`https://college-app-backend.onrender.com/student/viewStudent/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateProfile = () => {
    axios
      .put(`https://college-app-backend.onrender.com/student/profile/${id}`, input)
      .then((response) => {
        alert(response.data.status);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useTokenExpiry();

  return (
    <div>
      <div>
        <StudentNav />
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
                          <strong>Course : </strong>{" "}
                          {data && data.course_id && data.course_id.course}
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
                          <strong>Phone No : </strong> {data.phoneNo}
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
                            value={input.phoneNo}
                            name="phoneNo"
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
    </div>
  );
};

export default StudentProfile;
