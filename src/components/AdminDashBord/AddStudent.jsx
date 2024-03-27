import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
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

const AddStudent = () => {
  const [departments, setDepartments] = useState([]);
  const [uniqueDep, setUniqueDep] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [input, setInput] = useState({
    staff_id: sessionStorage.getItem("id"),
    idNumber: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    course_id: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = () => {
    axios
      .get("http://localhost:3001/dep/viewAll", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        setDepartments(response.data.depData);
        setUniqueDep([
          ...new Set(
            response.data.depData.map((department) => department.department)
          ),
        ]);
      });

    axios
      .get("http://localhost:3001/course/viewall", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          setCourses(data.Courses);
        } else {
          console.error("Failed to fetch courses");
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const departmentChangeHandler = (event) => {
    setSelectedDepartment(event.target.value);
    setInput({ ...input, course_id: "" });
  };

  const submitHandler = () => {
    axios
      .post("http://localhost:3001/student/addStudent", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data.message);
        setInput({
          idNumber: "",
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          course_id: "",
          email: "",
          address: "",
          phoneNo: "",
          password: "",
        });
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
  return (
    <div>
      <NavBar user="/staffDash" profile="/adminProfile" />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              ID Number
            </label>
            <input
              type="text"
              className="form-control"
              name="idNumber"
              value={input.idNumber}
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={input.firstName}
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={input.lastName}
              name="lastName"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              DOB
            </label>
            <input
              type="date"
              className="form-control"
              value={input.dob}
              name="dob"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              gender
            </label>
            <input
              type="text"
              className="form-control"
              value={input.gender}
              name="gender"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="department">Choose a department:</label>
            <select
              id="department"
              value={selectedDepartment}
              className="form-select"
              onChange={departmentChangeHandler}
            >
              <option value="">Select Department</option>
              {uniqueDep.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>

            {selectedDepartment && (
              <div>
                <label htmlFor="course">Choose a course:</label>
                <select
                  id="course"
                  name="course_id"
                  value={input.course_id}
                  className="form-select"
                  onChange={inputHandler}
                >
                  <option value="">Select Course</option>
                  {courses
                    .filter(
                      (course) =>
                        course.department_id.department === selectedDepartment
                    )
                    .map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.course}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={input.email}
              name="email"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={input.address}
              name="address"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Phone No
            </label>
            <input
              type="number"
              className="form-control"
              value={input.phoneNo}
              name="phoneNo"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={input.password}
              name="password"
              onChange={inputHandler}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={submitHandler}>
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
