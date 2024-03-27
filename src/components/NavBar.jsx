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
              <li className="nav-item" >
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
