import axios from "axios";
import { ApiResponse } from "./types";

const BASE_URL = "http://localhost:8080";

// GET all items
export const getItems = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${BASE_URL}/items`);
  return response.data;
};

// POST a new item
export const addItem = async (item: string): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(`${BASE_URL}/add`, { item });
  return response.data;
};