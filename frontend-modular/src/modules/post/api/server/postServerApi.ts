import { cookies } from "next/headers";
import { Post } from "../../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPosts(): Promise<Post[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${API_BASE_URL}/posts`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }
  return res.json();
}

export async function getMyPosts(): Promise<Post[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${API_BASE_URL}/posts/my-posts`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load my posts");
  }

  return res.json();
}
