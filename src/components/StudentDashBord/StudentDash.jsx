import StudentNav from "./StudentNav";
import AdminCards from "../AdminDashBord/AdminCards";
import useTokenExpiry from "../../tokenExpireTime";



const StudentDash = () => {
  useTokenExpiry();

  return (
    <div>
      <StudentNav />
      <div className="container-fluid">
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="view Attandance" link="/studentAttandance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
