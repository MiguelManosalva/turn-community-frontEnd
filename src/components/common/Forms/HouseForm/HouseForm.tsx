import { Button, Form, Input, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { House } from "../../../../models/house";
import { createHouse, updateHouse } from "../../../../services/houseService";

interface HouseFormProps {
  handleSubmit: Function;
  editingHouse?: House | null;
}

const HouseForm: React.FC<HouseFormProps> = ({
  handleSubmit,
  editingHouse,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingHouse) {
      form.setFieldsValue(editingHouse);
    } else {
      form.resetFields();
    }
  }, [editingHouse, form]);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const houseData = {
      numeroCasa: values.numeroCasa,
      descripcion: values.descripcion,
    };

    const result = editingHouse
      ? await updateHouse(editingHouse.id ?? 0, houseData)
      : await createHouse(houseData);

    if (result && "statusCode" in result) {
      notification.error({
        message: `Error en la ${editingHouse ? "Actualización" : "Creación"}`,
        description: "Ocurrió un error al procesar la casa",
        placement: "topRight",
      });
    } else {
      notification.success({
        message: `Casa ${editingHouse ? "Actualizada" : "Creada"} Exitosamente`,
        placement: "topRight",
      });
      form.resetFields();
      handleSubmit();
    }

    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        name="houseForm"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="row-col"
      >
        <Form.Item
          name="numeroCasa"
          rules={[
            {
              required: true,
              message: "Ingresa el número de la casa!",
            },
          ]}
        >
          <Input placeholder="Número de Casa" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Ingresa una descripción para la casa!",
            },
          ]}
        >
          <Input placeholder="Descripción" />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            {editingHouse ? "Actualizar Casa" : "Crear Casa"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default HouseForm;
