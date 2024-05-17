import React, { useState, useEffect } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import "../StaffDashBord/AddAttandance.css";
import useTokenExpiry from "../../tokenExpireTime";

const AddAttendance = () => {
  useTokenExpiry();
  const departmentId = sessionStorage.getItem("departmentId");

  // State variables
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState({ course_id: "" });
  const [students, setStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [studentFetched, setStudentFetched] = useState(false);
  const [period, setPeriod] = useState("");

  // Fetch courses
  useEffect(() => {
    listCourses();
  }, []);

  const listCourses = () => {
    axios
      .post(
        "http://localhost:3001/course/viewCourseByDep",
        {
          department_id: departmentId,
        },
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        }
        setCourses(response.data.data);
      })
      .catch(() => {
        alert("Can't fetch courses");
      });
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchStudents = () => {
    axios
      .post("http://localhost:3001/student/viewStudByCourse", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "error") {
          console.log(res.data.message);
        }
        setStudents(res.data.data);
        setStudentFetched(true);
      });
  };

  const handleStudentClick = (id) => {
    setAbsentStudents((prevState) =>
      prevState.includes(id)
        ? prevState.filter((studentId) => studentId !== id)
        : [...prevState, id]
    );
  };

  const handleSubmit = () => {
    const absentees = {
      absentStudents,
      staff: sessionStorage.getItem("id"),
      period,
    };

    axios
      .post(
        "http://localhost:3001/absent/addAbsent",
        { absentees },
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((response) => {
        if (response.data.status === "success") {
          alert("successfully marked attandance");
          setPeriod("");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div>
      <StaffNavBar />
      <div className="container-flex">
        <h1>Mark Attendance</h1>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Select Course
            </label>
            <select
              name="course_id"
              value={input.course_id}
              onChange={handleInput}
              className="form-control"
            >
              <option value="">Select</option>
              {courses.map((value, index) => (
                <option key={index} value={value._id}>
                  {value.course}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <button className="btn btn-success" onClick={fetchStudents}>
              Search
            </button>
          </div>
        </div>
        {studentFetched && (
          <>
            <div className="row">
              <label htmlFor="" className="form-label">
                Select Period
              </label>
              <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <select
                  className="form-control"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="listStudents">
                  <div className="student-list">
                    {students.map((value, index) => (
                      <div
                        key={index}
                        className={`student-circle ${
                          absentStudents.includes(value._id) ? "absent" : ""
                        }`}
                        onClick={() => handleStudentClick(value._id)}
                        title={`${value.firstName} ${value.lastName}`}
                      >
                        {value.idNumber}
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-warning" onClick={handleSubmit}>
                    Mark Attendance
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddAttendance;
