import { House } from "./../house";
export interface ShiftDto {
  fechaInicio: Date;
  fechaFin: Date;
  casa: House;
  estado: "asignado" | "completado" | "pendiente";
}
