import React from "react";
import { Link } from "react-router-dom";

const HodNavBar = () => {
  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: " #e3f2fd" }}
      >
        <div className="container">
          <h2 className="navbar-brand">ABC COLLEGE</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/hodDash"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hodProfile">
                  Profile
                </Link>
              </li>

              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Staff
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/addStaff">
                      Add Staff
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/viewStaffHod"
                    >
                      View Staff
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/searchStaffHod">
                      Search Staff
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Subject
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/addSub">
                      Add Subject
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Allocate Subject
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/subAllocation">
                      New Allocation
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/viewAllocation">
                      View Allocation
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Course
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/addCourse">
                      Add Course
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/viewCourseHod">
                      View Course
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HodNavBar;
