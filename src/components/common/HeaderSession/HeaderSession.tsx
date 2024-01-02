import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HeaderSession: React.FC = () => {
  return (
    <Header>
      <div className="header-col header-brand">
        <h5>Barrio Unido</h5>
      </div>
      <div className="header-col header-nav">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard">
              <span>Inicio</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<NotificationOutlined />}>
            <Link to="/avisos">
              <span>Avisos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/perfil">
              <span>Perfil</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderSession;
