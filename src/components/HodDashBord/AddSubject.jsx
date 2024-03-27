import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState({
    course_id: "",
    subject: "",
  });
  useEffect(() => {
    fetch("http://localhost:3001/course/viewall", {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.Courses);
      });
  }, []);
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/subject/addSub", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data.message);
        setInput({
          course_id: "",
          subject: "",
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
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Course
            </label>
            <select
              name="course_id"
              id=""
              className="form-select"
              onChange={handleInput}
              value={input.course_id}
            >
              <option value=""></option>
              {courses.map((value, index) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.course}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              value={input.subject}
              name="subject"
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={handleSubmit}>
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
