import { Avatar, Tooltip } from "antd";
import { House } from "../house";

export const houseListMapper = (data: House[] | null) => {
  if (!data) return [];
  return data?.map((house) => {
    return {
      id: house.id,
      title: `Casa ${house.descripcion}`,
      numberHouse: house.numeroCasa,
      member: (
        <Avatar.Group size="large">
          {house.usuarios &&
            house.usuarios.map((d, index) => (
              <Tooltip
                placement="bottom"
                title={`${d.nombre} - Teléfono: ${d.telefono}`}
              >
                <Avatar style={{ backgroundColor: "#9b59b6" }}>
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
