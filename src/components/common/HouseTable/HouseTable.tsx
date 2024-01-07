import { Card, Spin, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { House } from "../../../models/house";
import { houseListMapper } from "../../../models/mappers/houseMapper";
import { getAllHouses } from "../../../services/houseService";

const emptyMessageStyle: CSSProperties = {
  textAlign: "center",
  padding: "20px",
  fontSize: "16px",
  color: "#888",
};

const HouseTable = () => {
  const { Title, Paragraph } = Typography;

  const [mappedShiftList, setMappedShiftList] = useState<any[]>([]);
  const [houseList, setHouseList] = useState<House[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getHouseListFetch = async () => {
    const result = await getAllHouses();

    if (Array.isArray(result)) {
      setHouseList(result);
      //   setMappedShiftList(shiftListMapper(result));
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!houseList) getHouseListFetch();
  }, [houseList]);

  return (
    <Spin spinning={!houseList && !error}>
      <Card bordered={false} className="criclebox cardbody h-full">
        <div className="project-ant">
          <div>
            <Title level={5}>Casas </Title>
            <Paragraph>
              Este es el listado de casas de la comunidad de vecinos y sus
              residentes.
            </Paragraph>
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
                    <td>{house.options}</td>
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
      </Card>
    </Spin>
  );
};

export default HouseTable;
