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
import StudentProfile from "./components/StudentDashBord/StudentProfile";
import StudentAttandance from "./components/StudentDashBord/StudentAttandance";
import AddSemester from "./components/HodDashBord/AddSemester";
import ViewSemester from "./components/HodDashBord/ViewSemester";
import Error from "./components/Error";
import Admin from "./Admin";
import Hod from "./Hod";
import Staff from "./Staff";
import Student from "./Student";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />} />

          <Route path="/" element={<SignIn />} />

          {/* admin */}
          <Route element={<Admin />}>
            <Route path="/adminDash" element={<AdminDash />} exact />
            <Route path="/adminProfile" element={<AdminProfile />} exact />
            <Route path="/addDep" element={<AddDepartment />} exact />
            <Route
              path="/viewDepartments"
              element={<ViewDepartments />}
              exact
            />
            <Route path="/addHod" element={<AddHod />} exact />
            <Route path="/viewHod" element={<ViewHod />} exact />
            <Route path="/searchHod" element={<SearchHod />} exact />
            <Route path="/viewStaffAdmin" element={<ViewStaffAdmin />} exact />
            <Route
              path="/searchStaffAdmin"
              element={<SearchStaffAdmin exact />}
            />
            <Route
              path="/viewCourseAdmin"
              element={<ViewCourseAdmin />}
              exact
            />
            <Route path="/searchStudent" element={<SearchStudent />} exact />
          </Route>

          {/* Hod */}
          <Route element={<Hod />}>
            <Route path="/hodDash" element={<HodDash />} exact />
            <Route path="/hodProfile" element={<HodProfile />} exact />
            <Route path="/addStaff" element={<AddStaff />} exact />
            <Route path="/viewStaffHod" element={<ViewStaffHod />} exact />
            <Route path="/searchStaffHod" element={<SearchStaffHod />} exact />
            <Route path="/addSub" element={<AddSubject />} exact />
            <Route
              path="/subAllocation"
              element={<SubjectAllocation />}
              exact
            />
            <Route
              path="/viewAllocation"
              element={<ViewSubjectAllocation />}
              exact
            />
            <Route path="/addCourse" element={<AddCourse />} exact />
            <Route path="/viewCourseHod" element={<ViewCourseHod />} exact />
            <Route path="/addSemester" element={<AddSemester />} exact />
            <Route path="/viewSemester" element={<ViewSemester />} exact />
          </Route>

          {/* staff */}
          <Route element={<Staff />}>
            <Route path="/staffDash" element={<StaffDash />} exact />
            <Route path="/staffProfile" element={<StaffProfile />} exact />
            <Route path="/addStudent" element={<AddStudent />} exact />
            <Route
              path="/viewStudentStaff"
              element={<ViewStudentsStaff />}
              exact
            />
            <Route path="/addAttandance" element={<AddAttandance />} exact />
            <Route path="/viewAttandance" element={<ViewAttandance />} exact />
          </Route>

          {/* student */}
          <Route element={<Student />}>
            <Route path="/studentDash" element={<StudentDash />} exact />
            <Route path="/studentProfile" element={<StudentProfile />} exact />
            <Route
              path="/studentAttandance"
              element={<StudentAttandance />}
              exact
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
