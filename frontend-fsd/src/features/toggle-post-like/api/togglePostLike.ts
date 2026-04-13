import { apiClient } from "@/shared/api/axiosInstance";

export type TogglePostLikeResponse = {
  liked: boolean;
  likeCount: number;
};

export async function togglePostLike(
  postId: number,
): Promise<TogglePostLikeResponse> {
  const res = await apiClient.post<TogglePostLikeResponse>(
    `posts/${postId}/like`,
  );
  return res.data;
}
