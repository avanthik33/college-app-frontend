import React, { useState } from "react";
import AdminNavBar from "../NavBar";
import axios from "axios";

const SearchHod = () => {
  const [notHide, setNotHide] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    idNumber: "",
  });
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    try {
      axios
        .post("http://localhost:3001/hod/search", input, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setData(response.data.data);
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed.Please try again later");
    }
  };

  const handleHide = () => {
    setNotHide(true);
  };
  return (
    <div>
      <AdminNavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        <h3>SEARCH HOD</h3>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={input.firstName}
              name="firstName"
              onChange={handleInput}
            />
            <button
              className="btn btn-success"
              onClick={() => {
                handleSearch();
                handleHide();
              }}
            >
              Search
            </button>
          </div>
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="" className="form-label">
              ID Number
            </label>
            <input
              type="number"
              className="form-control"
              value={input.idNumber}
              name="idNumber"
              onChange={handleInput}
            />
            <button
              className="btn btn-success"
              onClick={() => {
                handleSearch();
                handleHide();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <h1>DETAILS OF HOD</h1>
          </div>
          {notHide && (
            <>
              {!data ? (
                <>
                  <h3>NO DATA FOUND</h3>
                </>
              ) : (
                <div className="row">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Heading</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Id Number</td>
                        <td>{data && data.idNumber}</td>
                      </tr>
                      <tr>
                        <td>First Name</td>
                        <td>{data && data.firstName}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{data && data.lastName}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{data && data.gender}</td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td>
                          {data.department_id
                            ? data.department_id.department
                            : "Somthing went wrong may be department deleted"}
                        </td>
                      </tr>
                      <tr>
                        <td>Qualification</td>
                        <td>{data && data.qualification}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{data && data.email}</td>
                      </tr>
                      <tr>
                        <td>Phone No</td>
                        <td>{data && data.phoneNo}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHod;
