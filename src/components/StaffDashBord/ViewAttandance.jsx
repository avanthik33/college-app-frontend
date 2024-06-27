import React, { useEffect, useState } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const ViewAttandance = () => {
  useTokenExpiry();

  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState({
    date: "",
    course_id: "",
  });
  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]);
  const departmentId = sessionStorage.getItem("departmentId");

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const searchByDate = () => {
    axios
      .post("https://campus-9pqa.onrender.com/absent/viewAbsentees", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "error") {
          console.log(res.data.message);
        }
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearched = () => {
    setSearched(true);
  };

  const handleClick = () => {
    handleSearched();
    searchByDate();
  };

  const fetchCourses = () => {
    axios
      .post(
        "https://campus-9pqa.onrender.com/course/viewCourseByDep",
        { department_id: departmentId },
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div>
      <StaffNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>VIEW ATTANDANCE</h1>
        <hr />
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="" className="form-label">
              Select Date
            </label>
            <input
              type="date"
              className="form-control"
              onChange={handleInput}
              value={input.date}
              name="date"
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="" className="form-label">
              Select Course
            </label>
            <select
              name="course_id"
              value={input.course_id}
              onChange={handleInput}
              id=""
              className="form-control"
            >
              <option value="">select</option>
              {course.map((value, index) => {
                return (
                  <option key={index} value={value._id}>
                    {value.course}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <button className="btn btn-success" onClick={handleClick}>
              Search
            </button>
          </div>
        </div>
        {searched && (
          <div className="container-flex">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Period</th>
                      <th scope="col">Staff</th>
                      <th scope="col">Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={index}>
                        <td>{value.period}</td>
                        <td>{value.staff.firstName}</td>
                        <td>
                          {value.absentStudents
                            .map((student) => student.idNumber)
                            .join(",  ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttandance;
