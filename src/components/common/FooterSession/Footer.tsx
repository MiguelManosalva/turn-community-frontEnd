import React from "react";
import { Footer } from "antd/es/layout/layout";
import { Menu } from "antd";

const FooterSession: React.FC = () => {
  return (
    <Footer>
      <Menu></Menu>
      <p className="copyright">
        Copyright © 2021 Barrio Unido un proyecto creado con 💜 por
        <a href="#shogun">Miguel A. Manosalva Iraira</a>.
      </p>
    </Footer>
  );
};

export default FooterSession;
