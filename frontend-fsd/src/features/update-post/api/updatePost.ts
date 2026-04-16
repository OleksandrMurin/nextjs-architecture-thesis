import { Post } from "@/entities/post";
import { apiClient } from "@/shared/api/axiosInstance";

type UpdatePostPayload = {
  description: string;
  categoryId: string;
};

export async function updatePost(
  postId: number,
  payload: UpdatePostPayload,
): Promise<Post> {
  const res = await apiClient.patch(`posts/${postId}`, {
    description: payload.description,
    categoryId: Number(payload.categoryId),
  });
  return res.data;
}
