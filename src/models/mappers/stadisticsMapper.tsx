import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StadisticDto } from "../dto/stadisticsDto";

export const stadisticsMapper = (data: StadisticDto | null) => {
  return [
    {
      today: "Total de Casas",
      title: data ? data.houses.toString() : "-",
      icon: <HomeOutlined />,
      type: "house",
    },
    {
      today: "Vecinos registrados",
      title: data ? data.users.toString() : "-",
      icon: <UserOutlined />,
      type: "user",
    },
    {
      today: "Turnos Completados",
      title: data ? data.shifts.toString() : "-",
      icon: <UnorderedListOutlined />,
      type: "shift",
    },
  ];
};
