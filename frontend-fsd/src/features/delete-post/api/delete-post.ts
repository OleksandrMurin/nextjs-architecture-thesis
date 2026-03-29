import { apiClient } from "@/shared/api/axiosInstance";

export async function deletePostById(id: number) {
  const res = await apiClient.delete(`posts/${id}`);
  return res.status;
}
