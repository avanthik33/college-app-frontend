import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = (props) => {
  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  to={props.user}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={props.profile}>
                  Profile
                </Link>
              </li>

              {/* admin navbar */}

              {props.user === "/adminDash" && (
                <>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Department
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/addDep">
                          Add department
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/viewDepartments">
                          View departments
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
                      HOD
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/addHod">
                          Add HOD
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/viewHod">
                          View HOD
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/searchHod">
                          Search HOD
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
                      Staff
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/viewStaff">
                          View Staff
                        </Link>
                      </li>

                      <li>
                        <Link class="dropdown-item" to="/searchStaff">
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
                      Course
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/viewCourse">
                          View Course
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
                      Student
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="#">
                          Search student
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* logout is common for all */}

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

export default AdminNavBar;
