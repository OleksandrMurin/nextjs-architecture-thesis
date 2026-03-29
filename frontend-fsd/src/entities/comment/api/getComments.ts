import { apiClient } from "@/shared/api/axiosInstance";
import { Comment } from "../model/types";

export const getComments = async (id: number): Promise<Comment[]> => {
  const res = await apiClient.get(`posts/${id}/comments`);
  return res.data;
};
