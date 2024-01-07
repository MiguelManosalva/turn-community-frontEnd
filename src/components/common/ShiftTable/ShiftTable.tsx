import { HomeTwoTone } from "@ant-design/icons";
import { Card, Radio, Spin, Typography } from "antd";
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

  const [error, setError] = useState<string | null>(null);

  const getShiftListFetch = async () => {
    const result = await getShiftList();

    if (Array.isArray(result)) {
      setShiftList(result);
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    if (!shiftList) getShiftListFetch();
  }, [shiftList]);

  const onChange = (e: any): void => {
    return console.log(`radio checked:${e.target.value}`);
  };

  const mappedShiftList = shiftListMapper(shiftList);

  return (
    <Spin spinning={!shiftList && !error}>
      <Card bordered={false} className="criclebox cardbody h-full">
        <div className="project-ant">
          <div>
            <Title level={5}>Turnos </Title>
            <Paragraph className="lastweek">
              done this month<span className="blue">40%</span>
            </Paragraph>
          </div>
          <div className="ant-filtertabs">
            <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">TODOS</Radio.Button>
                <Radio.Button value="b">COMPLETADOS</Radio.Button>
                <Radio.Button value="c">NO COMPLETADOS</Radio.Button>
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
              </tr>
            </thead>
            <tbody>
              {mappedShiftList.length > 0 ? (
                mappedShiftList.map((d, index) => (
                  <tr key={index}>
                    <td>
                      <h6>
                        <HomeTwoTone
                          twoToneColor="#52c41a"
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
                      <span>{d.status}</span>
                      <div className="percent-progress">{d.progress}</div>
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
