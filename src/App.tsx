import moment from "moment";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./assets/styles/global.scss";
import "./assets/styles/theme/main.css";
import "./assets/styles/theme/responsive.css";
import Main from "./components/layout/Main/Main";
import Dashboard from "./pages/Dashboard/Dashboard";
import House from "./pages/House/House";
import Login from "./pages/Session/Login/Login";
import Register from "./pages/Session/Register/Register";
import Shift from "./pages/Shift/Shift";

moment.locale("es");

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return !token ? <>{children}</> : <Navigate to="/inicio" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <Main children={<Dashboard />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/casas"
          element={
            <PrivateRoute>
              <Main children={<House />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/turnos"
          element={
            <PrivateRoute>
              <Main children={<Shift />} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
