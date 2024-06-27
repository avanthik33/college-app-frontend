import React, { useEffect, useState } from "react";
import HodNavBar from "./HodNavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const AddSemester = () => {
  useTokenExpiry();
  const [hide, setHide] = useState(false);
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState({
    course_id: "",
    semester: "",
    students: [],
    subjects: [],
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

  const [students, setStudents] = useState([]);
  const fetchStudentsByCourse = (courseId) => {
    axios
      .post(
        "https://campus-9pqa.onrender.com/student/viewStudByCourse",
        { course_id: courseId },
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        setStudents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCourseByDep();
  }, []);

  const handleStudentSelect = (event) => {
    const studentId = event.target.value;
    const isChecked = event.target.checked;

    setInput((prevInput) => {
      let updatedStudents = [...prevInput.students];
      if (isChecked) {
        updatedStudents.push(studentId);
      } else {
        updatedStudents = updatedStudents.filter((id) => id !== studentId);
      }
      return { ...prevInput, students: updatedStudents };
    });
  };

  const handleSelect = (event) => {
    const selectedCourseId = event.target.value;
    setInput({ ...input, course_id: selectedCourseId });
    if (selectedCourseId) {
      fetchStudentsByCourse(selectedCourseId);
      fetchSubjectsByCourse(selectedCourseId);
    }
  };
  const handleSubjectSelect = (event) => {
    const subjectId = event.target.value;
    const isChecked = event.target.checked;

    setInput((prevInput) => {
      let updatedSubjects = [...prevInput.subjects];
      if (isChecked) {
        updatedSubjects.push(subjectId);
      } else {
        updatedSubjects = updatedSubjects.filter((id) => id !== subjectId);
      }
      return { ...prevInput, subjects: updatedSubjects };
    });
  };

  const [subjects, setSubjects] = useState([]);
  const fetchSubjectsByCourse = (courseId) => {
    setSubjects([]);
    axios
      .post(
        "https://campus-9pqa.onrender.com/subject/viewSubByCourse",
        { course_id: courseId },
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setSubjects(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleHide = () => {
    setHide(true);
  };

  const handleSubmit = () => {
    axios
      .post("https://campus-9pqa.onrender.com/semester/addSemester", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        alert(res.data.message);
        setInput({
          course_id: "",
          semester: "",
          students: [],
          subjects: [],
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleSemesterChange = (event) => {
    setInput({ ...input, semester: event.target.value });
  };

  console.log(input);

  return (
    <div>
      <HodNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>ADD SEMESTER</h1>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
            </div>
          </div>
          <div className="row">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="" className="form-label">
                Semester
              </label>
              <input
                type="number"
                value={input.semester}
                name="semester"
                //look here
                onChange={handleSemesterChange}
                className="form-control"
                onSelect={handleHide}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              {students.length > 0 && (
                <div className="studentsList">
                  <label className="form-label">Select Students</label>
                  <div className="row">
                    {students.map((student, index) => (
                      <div
                        key={index}
                        className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
                      >
                        <label
                          className="form-check-label-container"
                          htmlFor={`student-${student._id}`}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`student-${student._id}`}
                            value={student._id}
                            onChange={handleStudentSelect}
                          />
                          ID No:{student.idNumber},Name: {student.firstName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              {subjects.length > 0 && (
                <div className="studentsList">
                  <label className="form-label">Select Subject</label>
                  <div className="row">
                    {subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
                      >
                        <label
                          className="form-check-label-container"
                          htmlFor={`subject-${subject._id}`}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`subject-${subject._id}`}
                            value={subject._id}
                            onChange={handleSubjectSelect}
                          />
                          {subject.subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {hide && (
            <div className="row">
              <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <button className="btn btn-success" onClick={handleSubmit}>
                  ADD SEMESTER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSemester;
