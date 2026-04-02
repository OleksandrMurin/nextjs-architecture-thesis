import { apiClient } from "@/shared/api/axiosInstance";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await apiClient.get("categories");
  return res.data;
};
