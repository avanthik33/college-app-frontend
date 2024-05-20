import React from "react";
import { Link } from "react-router-dom";

const StaffNavBar = () => {
  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <div>
      <nav
        class="navbar bg-dark border-bottom border-body navbar-expand-lg"
        data-bs-theme="dark"
        style={{ height: "80px" }}
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
                  to="/staffDash"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/staffProfile">
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
                  Student
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/addStudent">
                      Add Student
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/viewStudentStaff">
                      View Students
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
                  Attendace
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/addAttandance">
                      Add attandance
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/viewAttandance">
                      View Attandance
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

export default StaffNavBar;
