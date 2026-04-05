import { cookies } from "next/headers";
import { postQueryBuilder } from "../model/postQueryBuilder";
import { GetPostsParams, Post } from "../model/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPosts(params: GetPostsParams): Promise<Post[]> {
  const query = postQueryBuilder(params);
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
