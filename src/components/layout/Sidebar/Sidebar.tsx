import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo-unido-app.png";

const Sidenav = ({ color }: { color: string }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const dashboard = [
    <AppstoreOutlined style={{ color, fontSize: "20px" }} key="dashboard" />,
  ];
  const house = [
    <HomeOutlined style={{ color, fontSize: "20px" }} key="house" />,
  ];
  const shift = [
    <SwapOutlined style={{ color, fontSize: "20px" }} key="shift" />,
  ];
  const profile = [
    <UserOutlined style={{ color, fontSize: "20px" }} key="profile" />,
  ];
  const logOut = [
    <LogoutOutlined style={{ color, fontSize: "20px" }} key="logout" />,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Barrio Unido</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/inicio">
            <span
              className="icon"
              style={{
                background: page === "inicio" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Inicio</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/casas">
            <span
              className="icon"
              style={{
                background: page === "casas" ? color : "",
              }}
            >
              {house}
            </span>
            <span className="label">Casas</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/turnos">
            <span
              className="icon"
              style={{
                background: page === "turnos" ? color : "",
              }}
            >
              {shift}
            </span>
            <span className="label">Turnos</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Perfil</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink onClick={handleLogout} to="/login">
            <span className="icon">{logOut}</span>
            <span className="label">Cerrar Sesión</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Sidenav;
