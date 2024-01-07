import { House } from "./house";

export interface User {
  id: number;
  nombre: string;
  correoElectronico: string;
  rol: string;
  telefono: string;
  casa?: House;
}
