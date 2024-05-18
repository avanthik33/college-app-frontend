import AdminCards from "../AdminDashBord/AdminCards";
import HodNavBar from "./HodNavBar";
import useTokenExpiry from "../../tokenExpireTime";



const HodDash = () => {
  useTokenExpiry();

  return (
    <div>
      <HodNavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add staff" link="/addStaff" />
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add subject" link="/addSub" />
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Allocate Subject" link="/subAllocation" />
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
              <AdminCards heading="Add Course" link="/addCourse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodDash;
