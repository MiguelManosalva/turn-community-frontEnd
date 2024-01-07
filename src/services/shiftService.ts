import { ShiftDto } from "../models/dto/shiftDto";
import ApiService, { ApiResponse } from "./ApiService";

const endpoint = "/shift";
const apiService = new ApiService("http://localhost:3047/api/");

export const createShift = async (
  shiftData: Partial<ShiftDto>
): Promise<ShiftDto | ApiResponse> => {
  try {
    const uri = `${endpoint}`;
    const response = await apiService.post<ShiftDto>(uri, shiftData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al registrar el turno",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};

export const updateShift = async (
  id: number,
  shiftData: Partial<ShiftDto>
): Promise<ShiftDto | ApiResponse> => {
  try {
    const uri = `${endpoint}/${id}`;
    const response = await apiService.patch<ShiftDto>(uri, shiftData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al actualizar el turno",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};

export const getShiftList = async (): Promise<ShiftDto[] | ApiResponse> => {
  try {
    const uri = `${endpoint}`;
    const response = await apiService.get<ShiftDto[]>(uri);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al obtener los turnos",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};

export const deleteShift = async (
  id: number
): Promise<ApiResponse | unknown> => {
  try {
    const uri = `${endpoint}/${id}`;
    const response = await apiService.delete(uri);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al eliminar el turno",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};
