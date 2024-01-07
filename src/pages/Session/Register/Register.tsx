import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Select,
  Spin,
  Typography,
  notification,
} from "antd";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterSession from "../../../components/common/FooterSession/Footer";
import { RegisterDto } from "../../../models/dto/registerDto";
import { House } from "../../../models/house";
import { getAllHouses } from "../../../services/houseService";
import { registerUser } from "../../../services/sessionService";

const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [houses, setHouses] = useState<House[]>([]);

  const getHouses = async () => {
    const response = await getAllHouses();
    if (Array.isArray(response)) {
      setHouses(response);
    } else {
      setHouses([]);
    }
  };

  useMemo(() => {
    getHouses();
  }, []);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const register: RegisterDto = {
      nombre: values.name,
      correoElectronico: values.email,
      contrasena: values.password,
      casaId: values.house,
      telefono: "+569" + values.phone,
    };

    const result = await registerUser(register);

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
      navigate("/login");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        {/* <HeaderSession /> */}
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Registro</Title>
              <p className="text-lg">
                Usa este formulario para crear tu cuenta en Barrio Unido.
              </p>
            </div>
          </div>
          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Registra tu cuenta</h5>}
          >
            <Spin spinning={isLoading}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="row-col"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu nombre!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
                <Form.Item
                  name="house"
                  rules={[{ required: true, message: "Selecciona una casa!" }]}
                >
                  <Select placeholder="Selecciona una casa" allowClear>
                    {houses.map((house: House) => (
                      <Option key={house.id} value={house.id}>
                        {house.numeroCasa} - {house.descripcion}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
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
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu número de teléfono!",
                    },
                    {
                      max: 8,
                      message: "El número de teléfono debe tener 8 dígitos!",
                    },
                  ]}
                >
                  <Input
                    addonBefore="+569"
                    maxLength={8}
                    placeholder="Teléfono Celular"
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu contraseña!",
                    },
                    {
                      min: 6,
                      message:
                        "La contraseña debe tener al menos 6 caracteres!",
                    },
                    {},
                  ]}
                >
                  <Input.Password
                    placeholder="Contraseña"
                    visibilityToggle={true}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    REGISTRATE!
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="font-bold text-dark">
                  Iniciar Sesión
                </Link>
              </p>
            </Spin>
          </Card>
        </Content>
        <FooterSession />
      </div>
    </>
  );
};

export default Register;
