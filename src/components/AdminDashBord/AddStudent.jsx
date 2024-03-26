import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";

const AddStudent = () => {
  const [departments, setDepartments] = useState([]);
  const [uniqueDep, setUniqueDep] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [input, setInput] = useState({
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
    axios.get("http://localhost:3001/dep/viewAll").then((response) => {
      setDepartments(response.data.depData);
      setUniqueDep([
        ...new Set(
          response.data.depData.map((department) => department.department)
        ),
      ]);
    });

    axios
      .get("http://localhost:3001/course/viewall")
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
      .post("http://localhost:3001/student/addStudent", input)
      .then((response) => {
        alert(response.data.message);
      });
  };
  return (
    <div>
      <NavBar user="/staffDash" />
      <div className="container">
        <div className="row g-3">
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
