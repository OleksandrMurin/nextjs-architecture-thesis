"use client";

import { createPost } from "@/modules/post/api/postActions";
import PostForm, { PostFormValues } from "@/modules/post/components/PostForm";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();
  async function onSubmit({ description, categoryId, image }: PostFormValues) {
    if (!image) {
      throw new Error("Image is required");
    }

    await createPost(image, description, categoryId);
    router.push("/my-posts");
  }

  return <PostForm mode="create" onSubmit={onSubmit} />;
}
