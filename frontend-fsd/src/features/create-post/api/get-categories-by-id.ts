import { Category } from "@/entities/post";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getCategoryById(id: number): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`);
  if (!res.ok) {
    throw new Error("Failed to load category with such id");
  }

  return res.json();
}
