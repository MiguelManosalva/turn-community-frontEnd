import { Button, Form, Input, Select, Spin, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import { RegisterDto } from "../../../../models/dto/registerDto";
import { House } from "../../../../models/house";
import { User } from "../../../../models/user";
import { getAllHouses } from "../../../../services/houseService";
import { createUser, updateUser } from "../../../../services/userService";

const { Option } = Select;

interface UserFormProps {
  handleSubmit: Function;
  editingUser?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ handleSubmit, editingUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [houses, setHouses] = useState<House[]>([]);

  const getHouses = async () => {
    const response = await getAllHouses();
    if ("statusCode" in response) {
      setHouses([]);
    } else {
      setHouses(response);
    }
  };

  useEffect(() => {
    if (editingUser) {
      console.log(editingUser);

      form.setFieldsValue({
        name: editingUser.nombre,
        email: editingUser.correoElectronico,
        house: editingUser?.casa?.id,
        rol: editingUser.rol,
        phone: formatNumber(editingUser.telefono),
      });
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

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

    const result = editingUser
      ? await updateUser(editingUser.id ?? 0, register)
      : await createUser(register);

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
      form.resetFields();
    }

    setIsLoading(false);
  };

  const formatNumber = (value: string | null) => {
    if (value) {
      value = value.replace("+569", "");
    } else {
      value = "";
    }

    return value.trim();
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        name="basic"
        form={form}
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
            {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserForm;
