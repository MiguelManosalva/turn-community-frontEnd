import { Spin } from "antd";

const FullPageLoader = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    }}
  >
    <Spin size="large" />
  </div>
);

export default FullPageLoader;
