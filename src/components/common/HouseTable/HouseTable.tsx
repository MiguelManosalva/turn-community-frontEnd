import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Spin, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { House } from "../../../models/house";
import { houseListMapper } from "../../../models/mappers/houseMapper";
import { deleteHouse, getAllHouses } from "../../../services/houseService";
import HouseForm from "../Forms/HouseForm/HouseForm";

const emptyMessageStyle: CSSProperties = {
  textAlign: "center",
  padding: "20px",
  fontSize: "16px",
  color: "#888",
};

const HouseTable = () => {
  const { Title, Paragraph } = Typography;

  const [houseList, setHouseList] = useState<House[] | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeForm, setTypeForm] = useState<string | null>(null);

  const getHouseListFetch = async () => {
    const result = await getAllHouses();

    if (Array.isArray(result)) {
      setHouseList(result);
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!houseList) getHouseListFetch();
  }, [houseList]);

  const titleForm = () => {
    if (typeForm === "new") return "Crear Casa";
    if (typeForm === "update") return "Actualizar Casa";
    return "";
  };

  const showModalForm = (houseId: number) => {
    const houseFinded = houseList?.find((h) => h.id === houseId) ?? null;
    setHouse(houseFinded);
    setShowModal(true);
    setTypeForm("update");
  };

  const handleEditForm = () => {
    setShowModal(false);
    getHouseListFetch();
    setTypeForm("update");
  };

  const handleNewHouse = () => {
    setHouse(null);
    setShowModal(true);
    setTypeForm("new");
  };

  const confirmDelete = (houseId: number) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar esta casa?",
      content:
        "Esta acción es irreversible y eliminará todos los datos relacionados con la casa.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "No, cancelar",
      async onOk() {
        await deleteHouse(houseId);
        await getHouseListFetch();
      },
    });
  };

  return (
    <Spin spinning={!houseList && !error}>
      <Card bordered={false} className="criclebox cardbody h-full">
        <div className="project-ant">
          <div>
            <Title level={5}>Casas</Title>
            <Paragraph>
              Este es el listado de casas de la comunidad de vecinos y sus
              residentes.
            </Paragraph>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewHouse}
            >
              Crear Casa
            </Button>
          </div>
        </div>
        <div className="ant-list-box table-responsive">
          <table className="width-100">
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>NÚMERO DE CASA</th>
                <th>VECINOS</th>
                <th>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {houseList && houseList.length > 0 ? (
                houseListMapper(houseList).map((house, index) => (
                  <tr key={index}>
                    <td>{house.title}</td>
                    <td>{house.numberHouse}</td>
                    <td>{house.member}</td>
                    <td>
                      <div className="btn-group">
                        <Button
                          onClick={() => showModalForm(house.id ?? 0)}
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
                          onClick={() => confirmDelete(house.id ?? 0)}
                          icon={<DeleteOutlined />}
                          style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={3} style={emptyMessageStyle}>
                  No hay casas disponibles.
                </td>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          closeIcon={true}
          title={titleForm()}
          open={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <HouseForm handleSubmit={handleEditForm} editingHouse={house} />
        </Modal>
      </Card>
    </Spin>
  );
};

export default HouseTable;
