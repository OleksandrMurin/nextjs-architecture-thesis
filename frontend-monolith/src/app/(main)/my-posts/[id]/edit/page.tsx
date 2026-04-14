"use client";
import { getPostById, updatePost } from "@/api/postActions";
import PostForm, { PostFormValues } from "@/components/PostForm";
import { Post } from "@/types/apiTypes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    async function loadPost() {
      const data = await getPostById(Number(id));
      setPost(data);
    }
    loadPost();
  }, [id]);

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
      onSubmit={onSubmit}
      initialCategoryId={post?.category.id}
      initialDescription={post?.description}
    />
  );
}

export default EditPage;
