import React, { useEffect, useState } from "react";
import axios from "axios";
import HodNavBar from "./HodNavBar";
import useTokenExpiry from "../../tokenExpireTime";

const AddSubject = () => {
  useTokenExpiry();

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
        if (data.status === "error") {
          console.log(data.message);
        }
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
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
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

  const fetchHodData = () => {
    axios
      .get(`http://localhost:3001/hod/view/${sessionStorage.getItem("id")}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
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
      <HodNavBar />
      <div className="container-fluid">
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
