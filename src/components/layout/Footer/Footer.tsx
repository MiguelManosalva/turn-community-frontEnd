import { HeartFilled } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React from "react";

const Footer: React.FC = () => {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row>
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2021, made with
            <HeartFilled /> by
            <a
              href="#pablo"
              className="font-weight-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Tim
            </a>
            for a better web.
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>{/* ... List Items */}</ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
