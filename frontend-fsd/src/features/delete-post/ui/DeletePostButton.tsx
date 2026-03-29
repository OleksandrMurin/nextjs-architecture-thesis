"use client";

import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deletePostById } from "../api/delete-post";

type DeletePostButtonProps = {
  postId: number;
};

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePostById(postId);
      router.refresh();
    } catch (error) {
      console.error("Error occurred in deletePostById:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <IconButton
      size="small"
      color="error"
      aria-label="delete post"
      onClick={onDelete}
      disabled={isDeleting}
    >
      <Delete />
    </IconButton>
  );
};

export default DeletePostButton;
