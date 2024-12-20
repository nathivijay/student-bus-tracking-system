import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminStudentRoute from "./components/AdminRoutes/AdminStudentRoute/AdminStudentRoute";
import AdminBusRoute from "./components/AdminRoutes/AdminBusRoute/AdminBusRoute";
import AdminDriverRoute from "./components/AdminRoutes/AdminDriverRoute/AdminDriverRoute";
import DriverTracker from "./components/DriverTracker/DriverTracker";
import MapComponent from "./components/MapComponent/MapComponent";
import ReportIssue from "./components/ReportIssue/ReportIssue";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/report-issue" element={<ReportIssue/>}/>
        <Route path="/student-dashboard" element={<StudentDashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route
            path="student"
            element={<AdminStudentRoute />}
          />
          <Route path="bus" element={<AdminBusRoute />} />
          <Route path="driver" element={<AdminDriverRoute />} />
          <Route path="track" element={<MapComponent />} />
          <Route path="driver" element={<DriverTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
