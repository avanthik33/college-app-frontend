import React from "react";
import { Link } from "react-router-dom";

const StudentNav = () => {
  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <div>
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
                    to="/studentDash"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
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
                    Attendace
                  </Link>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" to="#">
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
    </div>
  );
};

export default StudentNav;
