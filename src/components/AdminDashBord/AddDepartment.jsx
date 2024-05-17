import axios from "axios";
import NavBar from "./NavBar";
import useTokenExpiry from "../../tokenExpireTime";
import { useState } from "react";

const AddDepartment = () => {
  useTokenExpiry();

  const [input, setInput] = useState({
    admin_id: sessionStorage.getItem("id"),
    department: "",
    description: "",
  });
  const inputHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandle = () => {
    axios
      .post("http://localhost:3001/dep/addDep", input, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((resp) => {
        if (resp.data.status === "error") {
          console.log(resp.data.message);
        }
        alert(resp.data.message);
        setInput({
          department: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed. Please try again.");
      });
  };
  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 style={{ fontFamily: "fantasy" }}>ADD DEPARTMENT</h1>
        <hr />
        <div className="row g-3 justify-content-center">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={input.department}
              onChange={inputHandle}
              required
              autoFocus
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={input.description}
              onChange={inputHandle}
              required
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
            <button
              className="btn btn-success"
              style={{
                fontFamily: "cursive",
                textAlign: "center",
              }}
              onClick={submitHandle}
            >
              ADD department
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
