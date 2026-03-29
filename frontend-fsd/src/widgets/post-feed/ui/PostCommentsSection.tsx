"use client";

import { Comment, CommentsList, getComments } from "@/entities/comment";

import { deleteComments } from "@/features/delete-comment/api/delete-comment";
import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState, type FC } from "react";

import { addComment, AddCommentForm } from "@/features/add-comment";
import { useAppSelector } from "../../../hooks/reduxHooks";

type Props = {
  postId: number;
  setCommentCounter: Dispatch<SetStateAction<number>>;
};

export const PostCommentsSection: FC<Props> = ({
  postId,
  setCommentCounter,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated,
  );

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await getComments(postId);
        setComments(res);
      } catch (error) {
        console.error("Failed to load comments", error);
      }
    }

    loadComments();
  }, [postId]);

  async function onAddComment(text: string) {
    const res = await addComment(postId, text);
    setComments((prev) => [res, ...prev]);
    setCommentCounter((prev) => prev + 1);
  }

  async function onDelete(id: number) {
    await deleteComments(postId, id);
    setComments((prev) => prev.filter((c) => c.id != id));
    setCommentCounter((prev) => prev - 1);
  }

  return (
    <Stack spacing={2}>
      {isAuthenticated && <AddCommentForm onAddComment={onAddComment} />}
      <CommentsList comments={comments} onDelete={onDelete} />
    </Stack>
  );
};
