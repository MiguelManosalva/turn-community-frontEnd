import { Button, DatePicker, Form, Select, Spin, notification } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { ShiftDto } from "../../../../models/dto/shiftDto";
import { House } from "../../../../models/house";
import { getAllHouses } from "../../../../services/houseService";
import { createShift, updateShift } from "../../../../services/shiftService";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const { Option } = Select;
moment.locale("es");

interface HouseFormProps {
  handleSubmit: Function;
  editingShift?: ShiftDto | null;
}

const ShiftForm: React.FC<HouseFormProps> = ({
  handleSubmit,
  editingShift,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [houses, setHouses] = useState<House[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingShift) {
      // const fechaInicio = moment(editingShift.fechaInicio, "YYYY-MM-DD");
      // const fechaFin = moment(editingShift.fechaFin, "YYYY-MM-DD");

      form.setFieldsValue({
        // fecha: [fechaInicio, fechaFin],
        house: editingShift.casa.id,
        estado: editingShift.estado,
      });
    } else {
      form.resetFields();
    }
  }, [editingShift, form]);

  const getHouses = async () => {
    const response = await getAllHouses();
    if ("statusCode" in response) {
      setHouses([]);
    } else {
      setHouses(response);
    }
  };

  useEffect(() => {
    getHouses();
  }, []);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const fechaInicio = values.fecha[0].format("YYYY-MM-DD");
    const fechaFin = values.fecha[1].format("YYYY-MM-DD");

    const shiftData = {
      fechaInicio,
      fechaFin,
      casaId: values.house,
      estado: values.estado,
    };

    const result = editingShift
      ? await updateShift(editingShift.id ?? 0, shiftData)
      : await createShift(shiftData);

    if (result && "statusCode" in result) {
      notification.error({
        message: "Error en la Creación",
        description: result.message,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Creación Exitosa",
        description: "Turno creado con éxito",
        placement: "topRight",
      });
      handleSubmit();
      form.resetFields();
    }

    setIsLoading(false);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        name="shiftForm"
        onFinish={onFinish}
        className="row-col"
        form={form}
      >
        <Form.Item
          name="fecha"
          rules={[
            { required: true, message: "Selecciona el rango de fechas!" },
          ]}
        >
          <RangePicker
            placeholder={["Fecha de Inicio", "Fecha de Término"]}
            format="DD-MM-YYYY"
            disabledDate={disabledDate}
            style={{ width: "100%" }}
          />
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
          name="estado"
          rules={[{ required: true, message: "Selecciona el estado!" }]}
        >
          <Select placeholder="Selecciona el estado">
            <Option value="asignado">Asignado</Option>
            <Option value="completado">Completado</Option>
            <Option value="pendiente">Pendiente</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Crear Turno
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ShiftForm;
