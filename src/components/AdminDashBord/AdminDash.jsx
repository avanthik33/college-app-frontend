import NavBar from "./NavBar";
import AdminCards from "./AdminCards";
import useTokenExpiry from "../../tokenExpireTime";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDash = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [totalHods, setTotalHods] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const fetchTotalHods = () => {
    axios
      .get("http://localhost:3001/hod/totalHods", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setTotalHods(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTotalStudents = () => {
    axios
      .get("http://localhost:3001/student/totalStudents", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setTotalStudents(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchTotalStaffs = () => {
    axios
      .get("http://localhost:3001/staff/totalStaffs", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setTotalStaffs(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTotalStudents();
    fetchTotalStaffs();
    fetchTotalHods();
  }, []);
  useTokenExpiry();
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="heading">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <h1
                style={{
                  paddingTop: "10px",
                  fontFamily: "Arial, sans-serif",
                  color: "#002366",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "clamp(1.2rem, 2.5vw, 3rem)",
                }}
              >
                ADMIN DASHBOARD
              </h1>
            </div>
          </div>
          <hr />
        </div>

        <div className="statitics" style={{ paddingLeft: "10px" }}>
          <div className="row g-3">
            <div className="col col-12 col-sm-4 col-md-4 col -lg-4 vol-xl-4 col-xxl-4">
              <div
                class="card"
                style={{
                  height: "200px",
                  textAlign: "center",
                  backgroundColor: "white", // White background color
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="imageAndTotalNumber"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://logowik.com/content/uploads/images/student5651.jpg"
                    alt="Student Logo"
                    style={{
                      width: "100px",
                      height: "90px",
                    }}
                  />
                  <h1
                    style={{
                      color: "#002366", // Example color for the heading
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {totalStudents}
                  </h1>
                </div>
                <div class="card-body">
                  <h3
                    class="card-text"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL STUDENTS
                  </h3>
                </div>
              </div>
            </div>
            <div className="col col-12 col-sm-4 col-md-4 col -lg-4 vol-xl-4 col-xxl-4">
              <div
                class="card"
                style={{
                  height: "200px",
                  textAlign: "center",
                  backgroundColor: "white", // White background color
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="imageAndTotalNumber"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://i.pinimg.com/736x/c9/3b/a4/c93ba4038f42835e005356a3bc51d4ac.jpg"
                    alt="Staff Logo"
                    style={{
                      width: "100px",
                      height: "110px",
                    }}
                  />
                  <h1
                    style={{
                      color: "#002366", // Example color for the heading
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {totalStaffs}
                  </h1>
                </div>
                <div class="card-body">
                  <h3
                    class="card-text"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL STAFFS
                  </h3>
                </div>
              </div>
            </div>
            <div className="col col-12 col-sm-4 col-md-4 col -lg-4 vol-xl-4 col-xxl-4">
              <div
                class="card"
                style={{
                  height: "200px",
                  textAlign: "center",
                  backgroundColor: "white", // White background color
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h1
                  style={{
                    color: "#002366", // Example color for the heading
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {totalHods}
                </h1>
                <div class="card-body">
                  <h3
                    class="card-text"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL HOD'S
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <h5 class="card-header">Featured</h5>
              <div class="card-body">
                <h5 class="card-title">VIEW AND RESPOND COMPLAINTS</h5>
                <p class="card-text">
                  Supporting with staffs and students will decrease the
                  collision inside the institution.
                </p>

                <Link
                  to="#"
                  class={`btn btn-primary checkMessages ${
                    disabled ? "disabled" : ""
                  }`}
                >
                  Check Messages
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row g-3">
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add department" link="/addDep" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Department" link="/viewDepartments" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add Hod" link="/addHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Hod" link="/viewHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Hod" link="/searchHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Staff" link="/viewStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Staff" link="/searchStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Course" link="/viewCourse" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Student" link="/searchStudent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
