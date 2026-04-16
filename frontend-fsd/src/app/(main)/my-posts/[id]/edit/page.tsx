"use client";

import { Category, Post } from "@/entities/post";
import { getPostById } from "@/entities/post/api/getPostById";
import PostForm, { PostFormValues } from "@/entities/post/ui/PostForm";
import { getAllCategories } from "@/features/create-post/api/get-categories";
import { updatePost } from "@/features/update-post/api/updatePost";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function loadPost() {
      const data = await getPostById(Number(id));
      setPost(data);
    }
    loadPost();
  }, [id]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }

    loadCategories();
  }, []);

  async function onSubmit({ description, categoryId }: PostFormValues) {
    await updatePost(Number(id), {
      description,
      categoryId,
    });

    router.push("/my-posts");
  }

  return (
    <PostForm
      mode="edit"
      categories={categories}
      onSubmit={onSubmit}
      initialCategoryId={post?.category.id}
      initialDescription={post?.description}
    />
  );
}

export default EditPage;
