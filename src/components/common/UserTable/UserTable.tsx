import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Spin, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { userListMapper } from "../../../models/mappers/userMapper";
import { User } from "../../../models/user";
import { deleteUser, getUserList } from "../../../services/userService";
import UserForm from "../Forms/UserForm/UserForm";

const emptyMessageStyle: CSSProperties = {
  textAlign: "center",
  padding: "20px",
  fontSize: "16px",
  color: "#888",
};

const UserTable = () => {
  const { Title, Paragraph } = Typography;

  const [userList, setUserList] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeForm, setTypeForm] = useState<string | null>(null);

  const getUserListFetch = async () => {
    const result = await getUserList();

    if (Array.isArray(result)) {
      setUserList(result);
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!userList) getUserListFetch();
  }, [userList]);

  const titleForm = () => {
    if (typeForm === "new") return "Crear Usuario";
    if (typeForm === "update") return "Actualizar Usuario";
    return "";
  };

  const showModalForm = (userId: number) => {
    const userFound = userList?.find((u) => u.id === userId) ?? null;
    setUser(userFound);
    setShowModal(true);
    setTypeForm("update");
  };

  const handleEditForm = () => {
    setShowModal(false);
    getUserListFetch();
    setTypeForm("update");
  };

  const handleNewUser = () => {
    setUser(null);
    setShowModal(true);
    setTypeForm("new");
  };

  const confirmDelete = (userId: number) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar este usuario?",
      content:
        "Esta acción es irreversible y eliminará todos los datos relacionados con el usuario.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "No, cancelar",
      async onOk() {
        await deleteUser(userId);
        await getUserListFetch();
      },
    });
  };

  return (
    <Spin spinning={!userList && !error}>
      <Card bordered={false} className="criclebox cardbody h-full">
        <div className="project-ant">
          <div>
            <Title level={5}>Usuarios</Title>
            <Paragraph>Este es el listado de usuarios del sistema.</Paragraph>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewUser}
            >
              Crear Usuario
            </Button>
          </div>
        </div>
        <div className="ant-list-box table-responsive">
          <table className="width-100">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>TELÉFONO</th>
                <th>CORREO</th>
                <th>CASA</th>
                <th>ROL</th>
                <th>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {userList && userList.length > 0 ? (
                userListMapper(userList).map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.house}</td>
                    <td>{data.role}</td>
                    <td>
                      <div className="btn-group">
                        <Button
                          onClick={() => showModalForm(data.id ?? 0)}
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
                          onClick={() => confirmDelete(data.id ?? 0)}
                          icon={<DeleteOutlined />}
                          style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={3} style={emptyMessageStyle}>
                  No hay usuarios disponibles.
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
          <UserForm handleSubmit={handleEditForm} editingUser={user} />
        </Modal>
      </Card>
    </Spin>
  );
};

export default UserTable;
