import React from "react";
import { Link } from "react-router-dom";
import "./AdminCard.css";
const AdminCards = (props) => {
  return (
    <div className="admin-card-container">
      <div className="admin-card">
        <div className="admin-card-body">
          <h5 className="admin-card-title">{props.heading}</h5>
          <Link to={props.link} className="btn btn-primary">
            Navigate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
