import AdminCards from "../AdminDashBord/AdminCards";
import StaffNavBar from "./StaffNavBar";
import useTokenExpiry from "../../tokenExpireTime";



const StaffDash = () => {
  useTokenExpiry();
  return (
    <div>
      <StaffNavBar />
      <div className="container">
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add Student" link="/addStudent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDash;
