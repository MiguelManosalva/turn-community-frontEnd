import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// import Home from "./pages/Home/Home";
import "./assets/styles/global.scss";
import "./assets/styles/theme/main.css";
import "./assets/styles/theme/responsive.css";
import Main from "./components/layout/Main/Main";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Session/Login/Login";
import Register from "./pages/Session/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Main children=<Dashboard /> />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
