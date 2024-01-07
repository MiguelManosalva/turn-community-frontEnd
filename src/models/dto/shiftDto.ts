import { House } from "./../house";
import { User } from "./../user";
export interface ShiftDto {
  fechaInicio: Date;
  fechaFin: Date;
  casa: House;
  estado: "asignado" | "completado" | "pendiente";
  usuarios?: User[];
}
