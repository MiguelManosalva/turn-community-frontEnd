import {
  DeleteOutlined,
  EditOutlined,
  HomeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Badge, Button, Card, Modal, Radio, Spin, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { ShiftDto } from "../../../models/dto/shiftDto";
import { shiftListMapper } from "../../../models/mappers/shiftMapper";
import { deleteShift, getShiftList } from "../../../services/shiftService";
import ShiftForm from "../Forms/ShiftForm/ShiftForm";

const emptyMessageStyle: CSSProperties = {
  textAlign: "center",
  padding: "20px",
  fontSize: "16px",
  color: "#888",
};

const ShiftTable = () => {
  const { Title, Paragraph } = Typography;

  const [shiftList, setShiftList] = useState<ShiftDto[] | null>(null);
  const [mappedShiftList, setMappedShiftList] = useState<any[]>([]);
  const [typeShift, seTypeShift] = useState<string>("todos");
  const [error, setError] = useState<string | null>(null);
  const [showShiftModal, setShowShiftModal] = useState<boolean>(false);
  const [currentShift, setCurrentShift] = useState<ShiftDto | null>(null);
  const [typeForm, setTypeForm] = useState<string | null>(null);

  const getShiftListFetch = async () => {
    const result = await getShiftList();

    if (Array.isArray(result)) {
      setShiftList(result);
      setMappedShiftList(shiftListMapper(result));
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!shiftList) getShiftListFetch();
  }, [shiftList]);

  const onChange = (e: any): void => {
    seTypeShift(e.target.value);
    if (e.target.value === "todos") {
      setMappedShiftList(shiftListMapper(shiftList));
    } else {
      const filteredShiftList: ShiftDto[] =
        shiftList?.filter((d) => d.estado === e.target.value) ?? [];
      setMappedShiftList(shiftListMapper(filteredShiftList));
    }
    return console.log(`radio checked:${e.target.value}`);
  };

  const handleNewShift = () => {
    setCurrentShift(null);
    setShowShiftModal(true);
    setTypeForm("new");
  };

  const handleEditShift = (shiftId: number) => {
    const shiftToEdit =
      shiftList?.find((shift: ShiftDto) => shift.id === shiftId) ?? null;
    setCurrentShift(shiftToEdit);
    setShowShiftModal(true);
    setTypeForm("update");
    getShiftListFetch();
  };

  const confirmDelete = (houseId: number) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar este turno?",
      content:
        "Esta acción es irreversible y eliminará todos los datos relacionados con el turno.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "No, cancelar",
      async onOk() {
        await deleteShift(houseId);
        await getShiftListFetch();
      },
    });
  };

  const handleSubmit = () => {
    console.log("handleSubmit");

    setShowShiftModal(false);
    getShiftListFetch();
  };

  const titleForm = () => {
    if (typeForm === "new") return "Crear Turno";
    if (typeForm === "update") return "Actualizar Turno";
    return "";
  };

  return (
    <Spin spinning={!shiftList && !error}>
      <Card bordered={false} className="criclebox cardbody h-full">
        <div className="project-ant">
          <div>
            <Title level={5}>Turnos </Title>
            <Paragraph className="lastweek">
              Este es el listado de turnos asignados a las casas de la comunidad
              de vecinos.
            </Paragraph>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewShift}
            >
              Crear Turno
            </Button>
          </div>
          <div className="ant-filtertabs">
            <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
              <Radio.Group onChange={onChange} defaultValue={typeShift}>
                <Radio.Button value="todos">TODOS</Radio.Button>
                <Radio.Button value="asignado">ASIGNADOS</Radio.Button>
                <Radio.Button value="completado">COMPLETADOS</Radio.Button>
                <Radio.Button value="pendiente">PENDIENTES</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="ant-list-box table-responsive">
          <table className="width-100">
            <thead>
              <tr>
                <th>CASA RESPONSABLE</th>
                <th>ENCARGADOS</th>
                <th>FECHA DE INICIO</th>
                <th>FECHA DE TERMINO</th>
                <th>ESTADO</th>
                <th>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {mappedShiftList.length > 0 ? (
                mappedShiftList.map((d, index) => (
                  <tr key={index}>
                    <td>
                      <h6>
                        <HomeTwoTone
                          twoToneColor={
                            d.status === "asignado" ? "#2ecc71" : "#95a5a6"
                          }
                          className="mr-10"
                          style={{ fontSize: "24px" }}
                        />
                        {d.title}
                      </h6>
                    </td>
                    <td>{d.member}</td>
                    <td>
                      <span className="text-xs font-weight-bold">
                        {d.startDate}{" "}
                      </span>
                    </td>
                    <td>{d.endDate} </td>
                    <td>
                      {" "}
                      <Badge
                        status={
                          d.status === "completado" ? "success" : "default"
                        }
                        text={
                          d.status.charAt(0).toUpperCase() +
                          d.status.slice(1).toLowerCase()
                        }
                      />
                    </td>
                    <td>
                      <div className="btn-group">
                        <Button
                          onClick={() => handleEditShift(d.id ?? 0)}
                          type="text"
                          icon={<EditOutlined />}
                          style={{
                            backgroundColor: "#1890ff",
                            marginRight: "8px",
                            color: "#fff",
                          }}
                        />
                        <Button
                          type="text"
                          onClick={() => confirmDelete(d.id ?? 0)}
                          icon={<DeleteOutlined />}
                          style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={4} style={emptyMessageStyle}>
                  No hay turnos disponibles.
                </td>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          closeIcon={true}
          title={titleForm()}
          open={showShiftModal}
          onOk={() => setShowShiftModal(false)}
          onCancel={() => setShowShiftModal(false)}
          footer={null}
        >
          <ShiftForm handleSubmit={handleSubmit} editingShift={currentShift} />
        </Modal>
      </Card>
    </Spin>
  );
};

export default ShiftTable;
