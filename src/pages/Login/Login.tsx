import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import HeaderSession from "../../components/common/HeaderSession/HeaderSession";
import signinbg from "../../assets/images/img-login.png";
import "./Login.scss";
import FooterSession from "../../components/common/FooterSession/Footer";

const { Title } = Typography;
const { Footer, Content } = Layout;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout className="layout-default layout-signin">
      <HeaderSession />
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Inicio de Sesión</Title>
            <Title className="font-regular text-muted" level={5}>
              Ingrea tu email y tu contraseña para iniciar sesión en tu cuenta
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Debes ingresar tu email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Debes ingresar tu contraseña!",
                  },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="remember"
                className="aligin-center"
                valuePropName="checked"
              >
                <Switch defaultChecked onChange={onChange} />
                Recordar mi sesión
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                ¿Aún no tienes una cueta?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Crear una cuenta
                </Link>
              </p>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img className="img-left" src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
      <FooterSession />
    </Layout>
  );
};

export default Login;
