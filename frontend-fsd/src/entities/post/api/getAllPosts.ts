import { cookies } from "next/headers";
import { Post } from "../model/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPosts(category?: string): Promise<Post[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  const query = params.toString();
  const url = query
    ? `${API_BASE_URL}/posts?${query}`
    : `${API_BASE_URL}/posts`;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }
  return res.json();
}
