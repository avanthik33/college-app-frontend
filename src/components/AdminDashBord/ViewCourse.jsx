import React, { useEffect, useState } from "react";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const ViewCourse = () => {
  useTokenExpiry();

  const [data, setData] = useState([]);
  let length = data.length;

  const fetchCourse = () => {
    try {
      axios
        .get("https://college-app-backend.onrender.com/course/viewall", {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          if (response.data.status === "error") {
            console.log(response.data.message);
          }
          setData(response.data.Courses);
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed,Please try again later");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>COURSES</h1>
        <hr />
        {length === 0 ? (
          <>
            <h1 style={{ fontFamily: "fantasy", color: "red" }}>
              NO Data to show
            </h1>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row g-3">
                  {data.map((value, index) => {
                    return (
                      <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">{value.course}</h5>
                            <hr />
                            <h6 class="card-subtitle mb-2 text-body-secondary">
                              Department: {value.department_id.department}
                            </h6>
                            <p class="card-text">
                              Department Description:{" "}
                              {value.department_id.description}
                            </p>
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

export default ViewCourse;
