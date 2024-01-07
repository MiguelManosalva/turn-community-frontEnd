import { Col, Row } from "antd";
import ShiftTable from "../../components/common/ShiftTable/ShiftTable";

const Shift = () => {
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <ShiftTable />
        </Col>
      </Row>
    </div>
  );
};

export default Shift;
