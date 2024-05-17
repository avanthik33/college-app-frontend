import React, { useState } from "react";
import StaffNavBar from "./StaffNavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const ViewAttandance = () => {
  useTokenExpiry();

  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState({
    date: "",
  });
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const searchByDate = () => {
    axios
      .post("http://localhost:3001/absent/viewAbsentees", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "error") {
          console.log(res.data.message);
        }
        setData(res.data.data);
      });
  };
  const handleSearched = () => {
    setSearched(true);
  };

  const handleClick = () => {
    handleSearched();
    searchByDate();
  };
  console.log(data);
  return (
    <div>
      <StaffNavBar />
      <div className="container-flex">
        <h1>View Attandance</h1>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="" className="form-label">
              Select Date
            </label>
            <input
              type="date"
              className="form-control"
              onChange={handleInput}
              value={input.date}
              name="date"
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <button className="btn btn-success" onClick={handleClick}>
              Search
            </button>
          </div>
        </div>
        {searched && (
          <div className="container-flex">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Period</th>
                      <th scope="col">Staff</th>
                      <th scope="col">Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={index}>
                        <td>{value.period}</td>
                        <td>{value.staff.firstName}</td>
                        <td>
                          {value.absentStudents
                            .map((student) => student.idNumber)
                            .join(",  ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttandance;
