import React, { useEffect, useState } from "react";
import AdminNavBar from "./NavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const SearchStudent = () => {
  useTokenExpiry();

  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    name: "",
  });
  const [hide, setHide] = useState(false);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    axios
      .post("http://localhost:3001/student/searchStudentByName", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === "error") {
          alert(res.data.message);
        }
        setData(res.data.data);
      })
      .catch((error) => {
        alert("Error fetching data Please try agiain later")
        console.log(error.message);
      });
  };

  const handleHide = () => {
    setHide(true);
  };

  const handleOnclick = () => {
    handleHide();
    fetchData();
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>SEARCH STUDENT</h1>
        <hr />
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Enter the First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={input.name}
              name="name"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <button className="btn btn-success" onClick={handleOnclick}>
              Search
            </button>
          </div>
        </div>
        {hide && (
          <>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
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
                        <td>Course</td>
                        <td>
                          {data && data.course_id && data.course_id.course}
                        </td>
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchStudent;
