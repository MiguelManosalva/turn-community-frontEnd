import { useEffect, useState } from "react";

import {
  ClockCircleOutlined,
  HomeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Spin, Typography } from "antd";
import ShiftCalendar from "../../components/common/Calendar/Calendar";
import HouseForm from "../../components/common/Forms/HouseForm/HouseForm";
import ShiftForm from "../../components/common/Forms/ShiftForm/ShiftForm";
import UserForm from "../../components/common/Forms/UserForm/UserForm";
import HouseTable from "../../components/common/HouseTable/HouseTable";
import ShiftTable from "../../components/common/ShiftTable/ShiftTable";
import WeatherWidget from "../../components/common/WeatherWidget/WeatherWidget";
import { StadisticDto } from "../../models/dto/stadisticsDto";
import { WeatherDto } from "../../models/dto/weatherDto";
import { stadisticsMapper } from "../../models/mappers/stadisticsMapper";
import {
  getGeneralStadistics,
  getWeather,
} from "../../services/stadisticsService";

// import ava1 from "../assets/images/logo-shopify.svg";
// import ava2 from "../assets/images/logo-atlassian.svg";
// import ava3 from "../assets/images/logo-slack.svg";
// import ava4 from "../assets/images/logo-spotify.svg";
// import ava5 from "../assets/images/logo-jira.svg";
// import ava6 from "../assets/images/logo-invision.svg";
// import team1 from "../assets/images/team-1.jpg";
// import team2 from "../assets/images/team-2.jpg";
// import team3 from "../assets/images/team-3.jpg";
// import team4 from "../assets/images/team-4.jpg";
// import card from "../assets/images/info-card-1.jpg";

function Dashboard() {
  const { Title, Text } = Typography;

  const [stadistics, setStadistics] = useState<StadisticDto | null>(null);
  const [weather, setWeaher] = useState<WeatherDto | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isAdmin] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeForm, setTypeForm] = useState<string | null>(null);

  const titleForm = () => {
    if (typeForm === "user") return "Crear Usuario";
    if (typeForm === "house") return "Crear Casa";
    if (typeForm === "shift") return "Crear Turno";
    return "";
  };

  const getStadistics = async () => {
    const result = await getGeneralStadistics();
    if ("houses" in result) {
      setStadistics(result);
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!weather) getWeather();
  }, [weather]);

  useEffect(() => {
    if (!stadistics) getStadistics();
  }, [stadistics]);

  const handleForm = () => {
    getStadistics();
    setShowModal(false);
  };

  return (
    <div className="layout-content">
      <Spin spinning={!stadistics && !error}>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {stadisticsMapper(stadistics).map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>{c.title}</Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                    {isAdmin && (
                      <Col xs={24} style={{ textAlign: "center" }}>
                        {c.type === "user" && (
                          <Button
                            type="primary"
                            onClick={() => {
                              setTypeForm(c.type);
                              setShowModal(true);
                            }}
                          >
                            <UserAddOutlined className="white-text-button" />{" "}
                            <span className="white-text-button">
                              Crear Usuario
                            </span>
                          </Button>
                        )}

                        {c.type === "house" && (
                          <Button
                            type="primary"
                            onClick={() => {
                              setTypeForm(c.type);
                              setShowModal(true);
                            }}
                          >
                            <HomeOutlined className="white-text-button" />
                            <span className="white-text-button">
                              Crear Casa
                            </span>
                          </Button>
                        )}

                        {c.type === "shift" && (
                          <Button
                            type="primary"
                            onClick={() => {
                              setTypeForm(c.type);
                              setShowModal(true);
                            }}
                          >
                            <ClockCircleOutlined className="white-text-button" />
                            <span className="white-text-button">
                              Crear Turno
                            </span>
                          </Button>
                        )}
                      </Col>
                    )}
                  </Row>
                </div>
              </Card>
              <Modal
                closeIcon={true}
                title={titleForm()}
                open={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                footer={null}
              >
                {typeForm === "user" && <UserForm handleSubmit={handleForm} />}

                {typeForm === "house" && (
                  <HouseForm handleSubmit={handleForm} />
                )}
                {typeForm === "shift" && (
                  <ShiftForm handleSubmit={handleForm} />
                )}
              </Modal>
            </Col>
          ))}
        </Row>
      </Spin>

      <Row gutter={[24, 0]}>
        <Col sm={24} md={8} lg={8} xl={8} className="mb-24">
          <WeatherWidget />
        </Col>
        <Col sm={24} md={16} lg={16} xl={16} className="mb-24">
          <ShiftCalendar
            startDate="2024-01-01"
            endDate="2024-01-07"
            houseName="Casa prubeas"
          />
        </Col>

        {/* <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <Row gutter={[16, 16]}>
              <Col
                xs={24}
                md={12}
                sm={24}
                lg={12}
                xl={14}
                className="mobile-24"
              >
                <div className="h-full col-content p-20">
                  <div className="ant-muse">
                    <Text>Built by developers</Text>
                    <Title level={5}>Muse Dashboard for Ant Design</Title>
                    <Paragraph className="lastweek mb-36">
                      From colors, cards, typography to complex elements, you
                      will find the full documentation.
                    </Paragraph>
                  </div>
                  <div className="card-footer">
                    <a className="icon-move-right" href="#pablo">
                      Read More
                      {<RightOutlined />}
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12} sm={24} lg={12} xl={10} className="col-img">
                <div className="ant-cret text-right">
                </div>
              </Col>
            </Row>
          </Card>
        </Col> */}

        {/* <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
          <Card bordered={false} className="criclebox card-info-2 h-full">
            <div className="gradent h-full col-content">
              <div className="card-content">
                <Title level={5}>Work with the best</Title>
                <p>
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
              </div>
              <div className="card-footer">
                <a className="icon-move-right" href="#pablo">
                  Read More
                  <RightOutlined />
                </a>
              </div>
            </div>
          </Card>
        </Col> */}
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
          <ShiftTable />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
          <HouseTable />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
