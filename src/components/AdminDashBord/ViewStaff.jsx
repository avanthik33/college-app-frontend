import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTokenExpiry from "../../tokenExpireTime";

const ViewStaff = () => {
  useTokenExpiry();

  const [data, setData] = useState([]);

  const fetchStaffDetails = () => {
    try {
      axios
        .get("http://localhost:3001/staff/viewall", {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          if (response.data.status === "error") {
            console.log(response.data.message);
          }
          setData(response.data.data);
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed. please try agin later");
    }
  };

  const length = data.length;

  const handleDeleteStaff = (staffId) => {
    console.log(staffId)
    axios
      .delete(`http://localhost:3001/staff/delete/${staffId}`)
      .then((res) => {
        console.log(res.data.status);
        fetchStaffDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchStaffDetails();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>STAFF'S</h1>
        <hr />
        <div className="row">
          {length === 0 ? (
            <>
              <h1 style={{ fontFamily: "fantasy", color: "red" }}>
                No data to show
              </h1>
            </>
          ) : (
            <div className="col-col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="row">
                {data.map((value, index) => {
                  return (
                    <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                      <div className="staffCard">
                        <div class="card staffCard">
                          <div class="card-body staffBody">
                            <h5 class="card-title staffTitle">
                              {value.firstName}
                            </h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">
                              {value.email}
                            </h6>
                            <p class="card-text">
                              Department: {value.department_id.department}
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={()=>{handleDeleteStaff(value._id);}}
                        >
                          Delete
                        </button>
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
