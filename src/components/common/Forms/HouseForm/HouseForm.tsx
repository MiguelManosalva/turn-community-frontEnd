import { Button, Form, Input, Spin, notification } from "antd";
import { useState } from "react";
import { createHouse } from "../../../../services/houseService";

const HouseForm = ({ handleSubmit }: { handleSubmit: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const houseData = {
      numeroCasa: values.numeroCasa,
      descripcion: values.descripcion,
    };

    const result = await createHouse(houseData);
    if (result && "statusCode" in result) {
      notification.error({
        message: "Error en la Creación",
        description: "Ocurrió un error al crear la casa",
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Creación Exitosa",
        description: "Casa creada con éxito",
        placement: "topRight",
      });
      handleSubmit();
    }

    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        name="houseForm"
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
            Crear Casa
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default HouseForm;
