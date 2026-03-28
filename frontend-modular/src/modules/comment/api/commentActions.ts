import { apiClient } from "../../../shared/api/axiosInstance";
import { CommentInfo } from "../types";

export const addComment = async (
  id: number,
  text: string,
): Promise<CommentInfo> => {
  const res = await apiClient.post(`posts/${id}/comments`, {
    text: text,
  });
  return res.data;
};

export const getComments = async (id: number): Promise<CommentInfo[]> => {
  const res = await apiClient.get(`posts/${id}/comments`);
  return res.data;
};

export const deleteComments = async (
  postId: number,
  commentId: number,
): Promise<{ message: string; id: number }> => {
  const res = await apiClient.delete(`posts/${postId}/comments/${commentId}`);
  return res.data;
};
