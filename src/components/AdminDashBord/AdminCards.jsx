import React from "react";
import { Link } from "react-router-dom";

const AdminCards = (props) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.dep}</h5>
          <Link to={props.link} className="btn btn-primary">
            Navigate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
