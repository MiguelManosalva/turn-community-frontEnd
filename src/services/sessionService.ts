// src/services/HouseService.ts

import { LoginDto } from "../models/dto/login.dto";
import { RegisterDto } from "../models/dto/register.dto";
import { User } from "../models/user";
import ApiService from "./ApiService";

const endpoint = "/auth";
const apiService = new ApiService("http://localhost:3047/api/");

export const registerUser = async (
  payload: RegisterDto
): Promise<User | { statusCode: number; message: string }> => {
  try {
    const uri = `${endpoint}/register`;
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

export const loginUser = async (
  payload: LoginDto
): Promise<User | { statusCode: number; message: string }> => {
  try {
    const uri = `${endpoint}/login`;
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
