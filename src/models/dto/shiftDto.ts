import { User } from "./../user";
export interface ShiftDto {
  fechaInicio: Date;
  fechaFin: Date;
  casaId: number;
  descripcion: string;
  estado: "asignado" | "completado" | "pendiente";
  usuarios?: User[];
}
