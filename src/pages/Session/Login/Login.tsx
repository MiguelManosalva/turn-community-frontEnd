import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Spin,
  Switch,
  Typography,
  notification,
} from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinbg from "../../../assets/images/img-login.png";
import FooterSession from "../../../components/common/FooterSession/Footer";
import { LoginDto } from "../../../models/dto/loginDto";
import { loginUser } from "../../../services/sessionService";

const { Title } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const register: LoginDto = {
      email: values.email,
      password: values.password,
    };

    const result = await loginUser(register);

    if (result && "statusCode" in result) {
      notification.error({
        message: `Error ${result.statusCode}`,
        description: result.message,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Registro Exitoso",
        description: "Usuario registrado con éxito",
        placement: "topRight",
      });
      navigate("/dashboard");
      localStorage.setItem("token", result.accessToken);
    }

    setIsLoading(false);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout className="layout-default layout-signin">
      {/* <HeaderSession /> */}
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
            <Spin spinning={isLoading} size="large">
              <Form onFinish={onFinish} layout="vertical" className="row-col">
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu email!",
                    },
                    {
                      type: "email",
                      message: "El email no es válido!",
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
                  <Input.Password
                    placeholder="Contraseña"
                    visibilityToggle={true}
                  />
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
            </Spin>
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
