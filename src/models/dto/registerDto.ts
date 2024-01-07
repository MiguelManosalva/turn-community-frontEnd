export interface RegisterDto {
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  telefono: string;
  casaId: number;
  rol?: "vecino" | "administrador";
}
