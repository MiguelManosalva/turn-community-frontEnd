import { User } from "../user";

export const userListMapper = (data: User[] | null) => {
  if (!data) return [];
  return data?.map((user) => {
    return {
      id: user.id,
      name: `${user.nombre}`,
      phone: user.telefono,
      email: user.correoElectronico,
      house: user.casa?.descripcion,
      role: user.rol,
    };
  });
};
