import { StadisticDto } from "../models/dto/stadisticsDto";
import { WeatherDto } from "../models/dto/weatherDto";
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

export const getWeather = async (): Promise<WeatherDto | ApiResponse> => {
  try {
    const uri = `${endpoint}/weather`;
    const response = await apiService.get<WeatherDto>(uri);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al obtener el tiempo",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};
