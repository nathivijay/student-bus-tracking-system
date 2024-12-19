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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route
            path="student"
            element={<AdminStudentRoute />}
          />
          <Route path="bus" element={<AdminBusRoute />} />
          <Route path="driver" element={<AdminDriverRoute />} />
          <Route path="track" element={<DriverTracker />} />
          <Route path="map" element={<MapComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
