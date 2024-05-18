import React, { useEffect, useState } from "react";
import HodNavBar from "./HodNavBar";
import axios from "axios";
import useTokenExpiry from "../../tokenExpireTime";

const ViewSubjectAllocation = () => {
  useTokenExpiry();

  const [data, setData] = useState([]);

  const fetchData = () => {
    try {
      axios
        .get("http://localhost:3001/subAllocation/viewall", {
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
      alert("Request Failed. Please try again later");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <HodNavBar />
      <div className="container-fluid">
        <h1 style={{ fontFamily: "fantasy" }}>ALLOCATED SUBJECTS</h1>
        <hr />
        {data.map((value, index) => {
          return (
            <div className="row">
              <div class="card text-center" style={{ paddingTop: "10px" }}>
                <div class="card-header">Allocation</div>
                <div class="card-body">
                  <h5
                    class="card-title"
                    style={{ fontFamily: "cursive", fontSize: "40px" }}
                  >
                    {value.staff_id.firstName} : {value.subject_id.subject}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSubjectAllocation;
