import { Category } from "@/types/apiTypes";
import { apiClient } from "./axiosInstance";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await apiClient.get("categories");
  return res.data;
};
