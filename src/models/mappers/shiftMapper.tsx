import { Progress, Tooltip } from "antd";
import { formatDate } from "../../utils/date/dateUtil";
import { ShiftDto } from "../dto/shiftDto";

export const shiftListMapper = (data: ShiftDto[] | null) => {
  if (!data) return [];
  return data?.map((shift) => {
    return {
      title: `Casa ${shift.casa.numeroCasa + " " + shift.casa.descripcion}`,
      startDate: formatDate(shift.fechaInicio),
      endDate: formatDate(shift.fechaFin),
      status: shift.estado,
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            {/* <img className="tootip-img" src={team1} alt="" /> */}
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            {/* <img className="tootip-img" src={team2} alt="" /> */}
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            {/* <img className="tootip-img" src={team3} alt="" /> */}
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            {/* <img className="tootip-img" src={team4} alt="" /> */}
          </Tooltip>
        </div>
      ),
    };
  });
};
