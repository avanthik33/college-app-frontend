import React from "react";
import { Link } from "react-router-dom";

const AdminCards = (props) => {
  return (
    <div>
      <div className="card" style={{ height: "250px", width: "250px" }}>
        <div className="card-body" style={{ backgroundColor: "lightskyblue" }}>
          <h5 className="card-title" style={{ fontFamily: "monospace" }}>
            {props.heading}
          </h5>
          <Link
            to={props.link}
            className="btn btn-primary"
            style={{ fontFamily: "cursive" }}
          >
            Navigate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
