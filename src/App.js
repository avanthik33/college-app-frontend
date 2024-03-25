import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import StudentDash from "./components/StudentDashBord/StudentDash";
import AdminDash from "./components/AdminDashBord/AdminDash";
import HodDash from "./components/HodDashBord/HodDash";
import AddDepartment from "./components/AdminDashBord/AddDepartment";
import AddHod from "./components/AdminDashBord/AddHod";
import AddStudent from "./components/AdminDashBord/AddStudent";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
