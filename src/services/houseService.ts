import { House } from "../models/house";
import ApiService, { ApiResponse } from "./ApiService";

const endpoint = "/house";
const apiService = new ApiService("http://localhost:3047/api");

export const getAllHouses = async (): Promise<House[] | ApiResponse> => {
  try {
    const response = await apiService.get<House[]>(endpoint);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const getHouseById = async (
  id: number
): Promise<House | ApiResponse> => {
  try {
    const response = await apiService.get<House>(`${endpoint}/${id}`);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const createHouse = async (
  houseData: Partial<House>
): Promise<House | ApiResponse> => {
  try {
    const response = await apiService.post<House>(endpoint, houseData);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const updateHouse = async (
  id: number,
  houseData: Partial<House>
): Promise<House | ApiResponse> => {
  try {
    const response = await apiService.put<House>(
      `${endpoint}/${id}`,
      houseData
    );
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

// Función auxiliar para manejar errores
const handleError = (error: any): ApiResponse => {
  if (error.response && error.response.status) {
    return {
      statusCode: error.response.status,
      message: error.response.data.message || "Ocurrió un error en el servidor",
    };
  } else {
    return {
      statusCode: 500,
      message: "Error interno del servidor",
    };
  }
};
