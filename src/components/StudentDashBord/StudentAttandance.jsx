import React, { useEffect, useState } from "react";
import StudentNav from "./StudentNav";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const StudentAttandance = () => {
  useTokenExpiry();

  const [data, setData] = useState([]);
  const studentId = sessionStorage.getItem("id");

  const fetchData = () => {
    axios
      .post("http://localhost:3001/absent/viewAbsent", { id: studentId })
      .then((res) => {
        if (res.data.status === "error") {
          console.log(res.data.message);
        }
        setData(res.data.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div>
      <StudentNav />
      <div className="container">
        <h1>View Absent Details</h1>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{formatDate(value.date)}</td>
                      <td>{value.period}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttandance;
