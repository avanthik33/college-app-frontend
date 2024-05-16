import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import StudentDash from "./components/StudentDashBord/StudentDash";
import AdminDash from "./components/AdminDashBord/AdminDash";
import HodDash from "./components/HodDashBord/HodDash";
import AddDepartment from "./components/AdminDashBord/AddDepartment";
import AddHod from "./components/AdminDashBord/AddHod";
import AddStudent from "./components/AdminDashBord/AddStudent";
import AddStaff from "./components/HodDashBord/AddStaff";
import StaffDash from "./components/StaffDashBord/StaffDash";
import AddSubject from "./components/HodDashBord/AddSubject";
import SubjectAllocation from "./components/HodDashBord/SubjectAllocation";
import AdminProfile from "./components/AdminDashBord/AdminProfile";
import AddCourse from "./components/AdminDashBord/AddCourse";
import ViewDepartments from "./components/AdminDashBord/ViewDepartments";
import ViewHod from "./components/AdminDashBord/ViewHod";
import SearchHod from "./components/AdminDashBord/SearchHod";
import ViewStaff from "./components/AdminDashBord/ViewStaff";
import SearchStaff from "./components/AdminDashBord/SearchStaff";
import ViewCourse from "./components/AdminDashBord/ViewCourse";
import SearchStudent from "./components/AdminDashBord/SearchStudent";
import HodProfile from "./components/HodDashBord/HodProfile";
import ViewStaffAdmin from "./components/AdminDashBord/ViewStaffAdmin";
import ViewStaffHod from "./components/HodDashBord/ViewStaffHod";
import SearchStaffHod from "./components/HodDashBord/SearchStaffHod";
import SearchStaffAdmin from "./components/AdminDashBord/SearchStaffAdmin";
import ViewSubjectAllocation from "./components/HodDashBord/ViewSubjectAllocation";
import ViewCourseAdmin from "./components/AdminDashBord/ViewCourseAdmin";
import ViewCourseHod from "./components/HodDashBord/ViewCourseHod";
import StaffProfile from "./components/StaffDashBord/StaffProfile";
import ViewStudentsStaff from "./components/StaffDashBord/ViewStudentsStaff";
import AddAttandance from "./components/StaffDashBord/AddAttandance";
import ViewAttandance from "./components/StaffDashBord/ViewAttandance";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/studentDash" element={<StudentDash />} />
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/hodDash" element={<HodDash />} />
          <Route path="/addDep" element={<AddDepartment />} />
          <Route path="/addHod" element={<AddHod />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route path="/staffDash" element={<StaffDash />} />
          <Route path="/addSub" element={<AddSubject />} />
          <Route path="/subAllocation" element={<SubjectAllocation />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/viewDepartments" element={<ViewDepartments />} />
          <Route path="/viewHod" element={<ViewHod />} />
          <Route path="/searchHod" element={<SearchHod />} />
          <Route path="/viewStaff" element={<ViewStaff />} />
          <Route path="/searchStaff" element={<SearchStaff />} />
          <Route path="/viewCourse" element={<ViewCourse />} />
          <Route path="/searchStudent" element={<SearchStudent />} />
          <Route path="/hodProfile" element={<HodProfile />} />
          <Route path="/viewStaffAdmin" element={<ViewStaffAdmin />} />
          <Route path="/viewStaffHod" element={<ViewStaffHod />} />
          <Route path="/searchStaffHod" element={<SearchStaffHod />} />
          <Route path="/searchStaffAdmin" element={<SearchStaffAdmin />} />
          <Route path="/viewAllocation" element={<ViewSubjectAllocation />} />
          <Route path="/viewCourseAdmin" element={<ViewCourseAdmin />} />
          <Route path="/viewCourseHod" element={<ViewCourseHod />} />
          <Route path="/staffProfile" element={<StaffProfile />} />
          <Route path="/viewStudentStaff" element={<ViewStudentsStaff />} />
          <Route path="/addAttandance" element={<AddAttandance />} />
          <Route path="/viewAttandance" element={<ViewAttandance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
