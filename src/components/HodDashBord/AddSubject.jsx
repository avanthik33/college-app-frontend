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

const AddSubject = () => {
  const [courses, setCourses] = useState([]);
  const [hodData, setHodData] = useState("");
  const [input, setInput] = useState({
    course_id: "",
    subject: "",
  });
  let departmentName = "";
  useEffect(() => {
    fetch("http://localhost:3001/course/viewall", {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        const filterdCourses = data.Courses.filter(
          (course) => course.department_id.department === departmentName
        );
        setCourses(filterdCourses);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed. Please try again.");
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
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed. Please try again.");
      });
  };

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

  const fetchHodData = () => {
    axios
      .get(`http://localhost:3001/hod/view/${sessionStorage.getItem("id")}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        departmentName = response.data.data.department_id.department;
      })
      .catch((error) => {
        console.error(error);
        alert("Request Failed. Please try agin later");
      });
  };

  useEffect(() => {
    fetchHodData();
  }, []);

  return (
    <div>
      <AdminNavBar user="/hodDash" profile="/hodProfile" />
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
