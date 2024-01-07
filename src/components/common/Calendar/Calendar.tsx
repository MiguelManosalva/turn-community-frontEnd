import { Calendar, Card, Typography } from "antd";
import { PickerLocale } from "antd/lib/date-picker/generatePicker";
import esES from "antd/lib/locale/es_ES";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React from "react";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale("es");

const { Title } = Typography;

interface ShiftCalendarProps {
  startDate: string;
  endDate: string;
  houseName: string; // Nombre de la casa para el turno
}

const ShiftCalendar: React.FC<ShiftCalendarProps> = ({
  startDate,
  endDate,
  houseName,
}) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const dateCellRender = (value: Dayjs) => {
    if (value.isSameOrAfter(start, "day") && value.isSameOrBefore(end, "day")) {
      return (
        <div
          style={{ background: "#1890ff", color: "#fff", textAlign: "center" }}
        >
          {houseName}
        </div>
      );
    }
    return null;
  };

  const headerRender = () => {
    return null;
  };

  return (
    <Card title="Calendario de turnos" style={{ height: 400 }}>
      <Calendar
        dateCellRender={dateCellRender}
        headerRender={headerRender}
        locale={esES as unknown as PickerLocale}
        style={{ maxHeight: 300, overflow: "auto" }}
      />
    </Card>
  );
};

export default ShiftCalendar;
