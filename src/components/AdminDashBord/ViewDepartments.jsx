import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavBar from "../NavBar";

const ViewDepartments = () => {
  const [data, setData] = useState([]);
  const [notHide, setNotHide] = useState(false);
  const [depId, setDepId] = useState(null);
  const [input, setInput] = useState({
    department: "",
    description: "",
  });
  let length = data.length;

  const fetchDepartment = () => {
    try {
      axios
        .get("http://localhost:3001/dep/viewAll", {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setData(response.data.depData);
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed. Please try again later");
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const handleDeleteDepartment = (id) => {
    try {
      axios
        .delete(`http://localhost:3001/dep/delete/${id}`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          alert(response.data.message);
          fetchDepartment();
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed. Please try again later..");
    }
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleHide = (id) => {
    setDepId(id);
    setNotHide(true);
  };

  const handleUpdateDepartment = () => {
    try {
      axios
        .put(`http://localhost:3001/dep/edit/${depId}`, input, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          alert(response.data.message);
          fetchDepartment();
          handleHideFalse();
        });
    } catch (error) {
      console.error(error);
      alert("Request Failed. Please try again later");
    }
  };

  const handleHideFalse = () => {
    setNotHide(false);
  };

  return (
    <div>
      <AdminNavBar user="/adminDash" profile="/adminProfile" />
      <div className="container">
        {length === 0 ? (
          <>
            <h1 style={{ fontFamily: "fantasy" }}>NO data to show</h1>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                {notHide && (
                  <>
                    <div className="row">
                      <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">
                          Department Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.department}
                          name="department"
                          onChange={handleInput}
                          required
                        />
                      </div>
                      <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={input.description}
                          name="description"
                          onChange={handleInput}
                          required
                        />
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg 12 col-xl-12 col-xxl-12">
                        <button
                          className="btn btn-success"
                          onClick={handleUpdateDepartment} // Corrected
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Added By</th>
                      <th scope="col">Department Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => {
                      return (
                        <tr key={value._id}>
                          <td>{value.admin_id.email}</td>
                          <td>{value.department}</td>
                          <td>{value.description}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleHide(value._id)} // Corrected
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteDepartment(value._id)} // Corrected
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDepartments;
