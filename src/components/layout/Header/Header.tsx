import {
  BellOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  SearchOutlined,
  UserOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Col,
  Dropdown,
  Input,
  List,
  Row,
} from "antd";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const data = [
  {
    title: "New message from Sophie",
    description: (
      <>
        <ClockCircleOutlined /> 2 days ago
      </>
    ),
    // avatar: avatar,
  },
  {
    title: "New album by Travis Scott",
    description: (
      <>
        <ClockCircleOutlined /> 2 days ago
      </>
    ),
    avatar: <Avatar shape="square" icon={<WifiOutlined />} />,
  },
  {
    title: "Payment completed",
    description: (
      <>
        <ClockCircleOutlined /> 2 days ago
      </>
    ),
    avatar: <Avatar shape="square" icon={<CreditCardOutlined />} />,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown"
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

interface HeaderProps {
  placement?: "left" | "right";
  name?: string;
  subName?: string;
  onPress?: () => void;
  handleSidenavColor?: (color: string) => void;
  handleSidenavType?: (type: "transparent" | "white") => void;
  handleFixedNavbar?: (fixed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) => {
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
        <Col span={12} md={12} className="header-control">
          <Badge size="small" count={4}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <BellOutlined key={0} style={{ fontSize: "20px" }} />
              </a>
            </Dropdown>
          </Badge>

          <Link to="/sign-in" className="btn-sign-in">
            <UserOutlined key={0} />
            <span>Sign in</span>
          </Link>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};

export default Header;
