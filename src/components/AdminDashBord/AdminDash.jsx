import NavBar from "./NavBar";
import AdminCards from "./AdminCards";
import useTokenExpiry from "../../tokenExpireTime";

const AdminDash = () => {
  useTokenExpiry();
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add department" link="/addDep" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Department" link="/viewDepartments" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Add Hod" link="/addHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Hod" link="/viewHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Hod" link="/searchHod" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Staff" link="/viewStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="Search Staff" link="/searchStaff" />
          </div>
          <div className="row g-3 col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <AdminCards heading="View Course" link="/viewCourse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
