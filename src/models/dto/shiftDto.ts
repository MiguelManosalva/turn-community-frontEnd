import { House } from "./../house";
export interface ShiftDto {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  casa: House;
  estado: "asignado" | "completado" | "pendiente";
}
