import { Avatar, Progress, Tooltip } from "antd";
import { formatDate } from "../../utils/date/dateUtil";
import { ShiftDto } from "../dto/shiftDto";

export const shiftListMapper = (data: ShiftDto[] | null) => {
  if (!data) return [];
  return data?.map((shift) => {
    return {
      id: shift.id,
      title: `Casa ${shift.casa.numeroCasa + " " + shift.casa.descripcion}`,
      startDate: formatDate(shift.fechaInicio),
      endDate: formatDate(shift.fechaFin),
      status: shift.estado,
      progress: <Progress percent={60} size="small" />,
      member: (
        <Avatar.Group size="large">
          {shift.casa.usuarios &&
            shift.casa.usuarios.map((d, index) => (
              <Tooltip
                placement="bottom"
                title={`${d.nombre} - Teléfono: ${d.telefono}`}
              >
                <Avatar
                  style={{ backgroundColor: colorByStatus(shift.estado) }}
                >
                  {twoFirstLetters(d.nombre)}
                </Avatar>
              </Tooltip>
            ))}
        </Avatar.Group>
      ),
    };
  });
};

const twoFirstLetters = (name: string) => {
  if (!name) return "";
  const splittedName = name.split(" ");
  const firstLetter = splittedName[0].charAt(0);
  const secondLetter = splittedName.length > 1 ? splittedName[1].charAt(0) : "";
  return firstLetter + secondLetter;
};

const colorByStatus = (status: string) => {
  switch (status) {
    case "completado":
      return "#87d068";
    case "pendiente":
      return "#f1c40f";
    default:
      return "#1677ff";
  }
};
