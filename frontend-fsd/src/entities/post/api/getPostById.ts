import { apiClient } from "@/shared/api/axiosInstance";
import { Post } from "../model/types";

export async function getPostById(id: number): Promise<Post> {
  const res = await apiClient.get(`posts/${id}`);
  return res.data;
}
