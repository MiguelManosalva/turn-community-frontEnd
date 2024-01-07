import { StadisticDto } from "../models/dto/stadisticsDto";
import ApiService, { ApiResponse } from "./ApiService";

const endpoint = "/stadistics";
const apiService = new ApiService("http://localhost:3047/api/");

export const getGeneralStadistics = async (): Promise<
  StadisticDto | ApiResponse
> => {
  try {
    const uri = `${endpoint}`;
    const response = await apiService.get<StadisticDto>(uri);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al obtener las estadisticas generales",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};
