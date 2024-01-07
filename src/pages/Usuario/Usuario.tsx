import { Col, Row } from "antd";
import UserTable from "../../components/common/UserTable/UserTable";

const User = () => {
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <UserTable />
        </Col>
      </Row>
    </div>
  );
};

export default User;
