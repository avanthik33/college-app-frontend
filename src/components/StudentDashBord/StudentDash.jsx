import StudentNav from "./StudentNav";
import AdminCards from "../AdminDashBord/AdminCards";
import useTokenExpiry from "../../tokenExpireTime";
import { Link } from "react-router-dom";
import { useState } from "react";

const StudentDash = () => {
  const [disabled, setDisabled] = useState(true);

  useTokenExpiry();

  return (
    <div>
      <StudentNav />
      <div className="container-fluid">
        <h1
          style={{
            paddingTop: "10px",
            fontFamily: "Arial, sans-serif",
            color: "#002366",
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "clamp(1.2rem, 2.5vw, 3rem)",
          }}
        >
          STUDENT DASHBOARD
        </h1>
        <hr />
        <br />
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card">
              <h5 class="card-header">Featured</h5>
              <div class="card-body">
                <h5 class="card-title">VIEW AND RESPOND COMPLAINTS</h5>
                <p class="card-text">
                  Supporting with staffs and students will decrease the
                  collision inside the institution.
                </p>

                <Link
                  to="#"
                  class={`btn btn-primary checkMessages ${
                    disabled ? "disabled" : ""
                  }`}
                >
                  Check Messages
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="View Attandance" link="/studentAttandance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
