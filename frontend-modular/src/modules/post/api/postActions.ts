import { apiClient } from "../../../shared/api/axiosInstance";
import { Post } from "../types";

//TODO don`t forget to change returning value after iterations of experiment (BE part is ahead of FE)

export async function getAllPosts(): Promise<Post[]> {
  const res = await apiClient.get<Post[]>(`posts`);
  return res.data;
}

export async function getPostById(id: number): Promise<Post> {
  const res = await apiClient.get(`posts/${id}`);
  return res.data;
}

export async function deletePostById(id: number) {
  const res = await apiClient.delete(`posts/${id}`);
  return res.status;
}

export async function createPost(
  image: File,
  description: string,
  selectValue: string,
): Promise<Post> {
  const form = new FormData();
  form.append("image", image);
  form.append("description", description);
  form.append("categoryId", selectValue);

  const res = await apiClient.post("posts", form);
  return res.data;
}

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
