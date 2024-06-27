import React, { useEffect, useState } from "react";
import HodNavBar from "./HodNavBar";
import axios from "axios";

const ViewSemester = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState({
    course_id: "",
  });

  const fetchCourseByDep = () => {
    axios
      .post(
        "https://campus-9pqa.onrender.com/course/viewCourseByDep",
        {
          department_id: sessionStorage.getItem("department_id"),
        },
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelect = (event) => {
    const selectedCourseId = event.target.value;
    setInput({ ...input, course_id: selectedCourseId });
    if (selectedCourseId) {
    }
  };
  useEffect(() => {
    fetchCourseByDep();
  }, []);

  const [semData, setSemData] = useState([]);

  const fetchSemestersByCourse = () => {
    axios
      .post("https://campus-9pqa.onrender.com/semester/viewSemByCourse", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setSemData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(input);
  console.log(semData);
  return (
    <div>
      <HodNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>VIEW SEMESTERS</h1>
        <hr />
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="course-select" className="form-label">
              Select Course
            </label>
            <select
              name="course_id"
              value={input.course_id}
              onChange={handleSelect}
              id="course-select"
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
            <button
              className="btn btn-success"
              onClick={fetchSemestersByCourse}
            >
              Search
            </button>
          </div>
        </div>
        {semData ? (
          <>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="semesterData">
                  {semData.map((semester) => (
                    <div key={semester._id} className="semesterCard">
                      <h2>Semester {semester.semester}</h2>
                      <p>
                        Course:{" "}
                        {semester.course_id && semester.course_id.course}
                      </p>
                      <div>
                        <h3>Students:</h3>
                        <ul>
                          {semester.students.map((student) => (
                            <li key={student._id}>
                              {student.firstName} {student.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3>Subjects:</h3>
                        <ul>
                          {semester.subjects.map((subject) => (
                            <li key={subject._id}>{subject.subject}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>NO DATA FOUND</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewSemester;
