import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from "../NavBar";

const ViewStaff = () => {
  const [data, setData] = useState([]);
  const length = data.length;

  const fetchStaffDetails = () => {
    try {
      axios
        .get("http://localhost:3001/staff/viewall", {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setData(response.data.data);
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed. please try agin later");
    }
  };

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  return (
    <div>
      <AdminNavBar profile="/adminProfile" user="/adminDash" />
      <div className="container">
        <h1 style={{ fontFamily: "fantasy" }}>STAFF'S</h1>
        <hr />
        <div className="row">
          {length === 0 ? (
            <>
              <h1 style={{ fontFamily: "fantasy" }}>No data to show</h1>
            </>
          ) : (
            <div className="col-col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="row">
                {data.map((value, index) => {
                  return (
                    <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">{value.firstName}</h5>
                          <h6 class="card-subtitle mb-2 text-body-secondary">
                            {value.email}
                          </h6>
                          <p class="card-text">
                            Department: {value.department_id.department}
                          </p>
                          <Link to="/searchStaff" class="card-link">
                            Card link
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStaff;
