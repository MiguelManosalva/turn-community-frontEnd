import { User } from "./user";
export interface House {
  id?: number;
  numeroCasa: string;
  descripcion: string;
  usuarios?: User[];
}
