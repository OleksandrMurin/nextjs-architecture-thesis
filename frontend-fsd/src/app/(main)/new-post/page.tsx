"use client";

import { Category } from "@/entities/post";
import PostForm, { PostFormValues } from "@/entities/post/ui/PostForm";
import { createPost } from "@/features/create-post/api/create-post";
import { getAllCategories } from "@/features/create-post/api/get-categories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getAllCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  async function onSubmit(values: PostFormValues) {
    await createPost(values.image!, values.description, values.categoryId);

    router.push("/my-posts");
  }

  return <PostForm mode="create" categories={categories} onSubmit={onSubmit} />;
}
