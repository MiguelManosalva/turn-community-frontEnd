import { Affix, Layout } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidenav from "../Sidebar/Sidebar";

const { Header: AntHeader, Content, Sider } = Layout;

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const [sidenavType] = useState("transparent");

  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout className={`layout-dashboard rtl`}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color="#340e7a" />
      </Sider>
      <Layout>
        <Affix>
          <AntHeader className={`ant-header-fixed`}>
            <Header onPress={openDrawer} name={pathname} subName={pathname} />
          </AntHeader>
        </Affix>

        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Main;
