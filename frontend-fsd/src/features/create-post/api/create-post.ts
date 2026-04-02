import { Post } from "@/entities/post";
import { apiClient } from "@/shared/api/axiosInstance";

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
