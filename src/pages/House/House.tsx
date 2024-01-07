import { Col, Row } from "antd";
import HouseTable from "../../components/common/HouseTable/HouseTable";

const House = () => {
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <HouseTable />
        </Col>
      </Row>
    </div>
  );
};

export default House;
