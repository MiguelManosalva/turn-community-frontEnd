// src/services/HouseService.ts

import { House } from "../models/house";
import ApiService from "./ApiService";

const endpoint = "/house";
const apiService = new ApiService("http://localhost:3047/api");
export const getAllHouses = async (): Promise<House[]> => {
  try {
    const response = await apiService.get<House[]>(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHouseById = async (id: number): Promise<House> => {
  try {
    const response = await apiService.get<House>(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createHouse = async (
  houseData: Partial<House>
): Promise<House> => {
  try {
    const response = await apiService.post<House>(endpoint, houseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHouse = async (
  id: number,
  houseData: Partial<House>
): Promise<House> => {
  try {
    const response = await apiService.put<House>(
      `${endpoint}/${id}`,
      houseData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
