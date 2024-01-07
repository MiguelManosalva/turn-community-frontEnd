import { Button, Form, Input, Select, Spin, notification } from "antd";
import { useMemo, useState } from "react";
import { RegisterDto } from "../../../../models/dto/registerDto";
import { House } from "../../../../models/house";
import { getAllHouses } from "../../../../services/houseService";
import { createUser } from "../../../../services/userService";

const { Option } = Select;

const UserForm = ({ handleSubmit }: { handleSubmit: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [houses, setHouses] = useState<House[]>([]);

  const getHouses = async () => {
    const response = await getAllHouses();
    if ("statusCode" in response) {
      setHouses([]);
    } else {
      setHouses(response);
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
      rol: values.rol,
      telefono: "+569" + values.phone,
    };

    const result = await createUser(register);

    if (result && "statusCode" in result) {
      notification.error({
        message: `Error ${result.statusCode}`,
        description: result.message,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Registro Exitoso",
        description: "Usuario creado y registrado con éxito",
        placement: "topRight",
      });
      handleSubmit();
    }

    setIsLoading(false);
  };

  return (
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
          name="rol"
          rules={[{ required: true, message: "Selecciona un rol!" }]}
        >
          <Select placeholder="Selecciona un rol" allowClear>
            <Option key="vecino" value="vecino">
              Vecino - Solo visualización
            </Option>
            <Option key="administrador" value="administrador">
              Administrador - Visualización y edición
            </Option>
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
              message: "La contraseña debe tener al menos 6 caracteres!",
            },
            {},
          ]}
        >
          <Input.Password placeholder="Contraseña" visibilityToggle={true} />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserForm;
