import { Comment } from "@/entities/comment";
import { apiClient } from "@/shared/api/axiosInstance";

export const addComment = async (
  id: number,
  text: string,
): Promise<Comment> => {
  const res = await apiClient.post(`posts/${id}/comments`, {
    text: text,
  });
  return res.data;
};
