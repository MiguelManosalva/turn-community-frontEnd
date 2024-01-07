import { HomeTwoTone } from "@ant-design/icons";
import { Badge, Card, Radio, Spin, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { ShiftDto } from "../../../models/dto/shiftDto";
import { shiftListMapper } from "../../../models/mappers/shiftMapper";
import { getShiftList } from "../../../services/shiftService";

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
      </Card>
    </Spin>
  );
};

export default ShiftTable;
