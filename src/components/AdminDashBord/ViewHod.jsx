import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewHod = () => {
  const [data, setData] = useState([]);
  let length = data.length;

  const fetchHodDetails = () => {
    try {
      axios
        .get("http://localhost:3001/hod/viewAll", {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setData(response.data.data);
        });
    } catch (error) {
      console.log(error);
      alert("Request Failed. Please try again later");
    }
  };

  useEffect(() => {
    fetchHodDetails();
  }, []);
  return (
    <div>
      <AdminNavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        <h1 style={{ fontFamily: "fantasy" }}>HOD'S</h1>
        <hr />
        {length === 0 ? (
          <>
            <h1 style={{ fontFamily: "fantasy" }}>NO Data to show</h1>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  {data.map((value, index) => {
                    return (
                      <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                        <div class="card">
                          <div class="card-body">
                            <label htmlFor="" className="form-label"></label>
                            <h5 class="card-title">
                              {value.department_id.department
                                ? value.department_id.department
                                : "Somthing went wrong"}
                            </h5>
                            <hr />

                            <h6>NAME: {value.firstName}</h6>
                            <Link to="/searchHod" class="card-link">
                              Search About this Hod
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewHod;
