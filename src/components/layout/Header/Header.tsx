import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  placement?: "left" | "right";
  name?: string;
  subName?: string;
  onPress?: () => void;
  handleSidenavColor?: (color: string) => void;
  handleSidenavType?: (type: "transparent" | "white") => void;
  handleFixedNavbar?: (fixed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ name, subName }) => {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={12}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Páginas</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{name?.replace("/", "")}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName?.replace("/", "")}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Header;
