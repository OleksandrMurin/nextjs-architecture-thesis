import { apiClient } from "@/shared/api/axiosInstance";

export const deleteComments = async (
  postId: number,
  commentId: number,
): Promise<{ message: string; id: number }> => {
  const res = await apiClient.delete(`posts/${postId}/comments/${commentId}`);
  return res.data;
};
