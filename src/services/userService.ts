// src/services/HouseService.ts

import { RegisterDto } from "../models/dto/registerDto";
import { User } from "../models/user";
import ApiService from "./ApiService";

const endpoint = "/user";
const apiService = new ApiService("http://localhost:3047/api/");

export const createUser = async (
  payload: RegisterDto
): Promise<User | { statusCode: number; message: string }> => {
  try {
    const uri = `${endpoint}`;
    const response = await apiService.post<User>(uri, payload);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ||
          "Ocurrió un error al registrar el usuario",
      };
    } else {
      return {
        statusCode: 500,
        message: "Error interno del servidor",
      };
    }
  }
};
