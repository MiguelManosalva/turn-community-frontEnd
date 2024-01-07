import { Calendar } from "antd";
import "antd/dist/antd.css"; // Importa los estilos de Ant Design
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; // Importa la localización en español
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React from "react";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale("es");

interface ShiftCalendarProps {
  startDate: string;
  endDate: string;
}

const ShiftCalendar: React.FC<ShiftCalendarProps> = ({
  startDate,
  endDate,
}) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const dateCellRender = (value: Dayjs) => {
    if (value.isSameOrAfter(start, "day") && value.isSameOrBefore(end, "day")) {
      return (
        <div
          style={{ background: "#1890ff", color: "#fff", textAlign: "center" }}
        >
          Shift
        </div>
      );
    }
    return null;
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default ShiftCalendar;
