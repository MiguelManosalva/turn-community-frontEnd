import { Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";

const FooterSession: React.FC = () => {
  return (
    <Footer>
      <Menu></Menu>
      <p className="copyright">
        © 2024 Barrio Unido un proyecto creado con 💜 por
        <a href="#shogun">Miguel A. Manosalva Iraira</a>.
      </p>
    </Footer>
  );
};

export default FooterSession;
