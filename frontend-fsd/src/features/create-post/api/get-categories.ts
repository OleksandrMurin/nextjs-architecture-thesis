import { Category } from "@/entities/post";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error("Failed to load categories");
  }
  return res.json();
}
