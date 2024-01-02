import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
// import UserDashboard from "./pages/Dashboard/User/UserDashboard";
// import ShiftManagement from "./pages/ShiftManagement/ShiftManagement";
// import UserProfile from "./pages/UserProfile/UserProfile";
// import Notifications from "./pages/Notifications/Notifications";
// import Settings from "./pages/Settings/Settings";
import "./assets/styles/global.scss";
import "./assets/styles/theme/main.css";
import "./assets/styles/theme/responsive.css";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/shift-management" element={<ShiftManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
