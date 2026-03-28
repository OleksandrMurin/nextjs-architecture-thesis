"use client";

import { CommentInfo } from "@/types/apiTypes";
import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState, type FC } from "react";
import { addComment, deleteComments, getComments } from "../api/commentActions";
import { useAppSelector } from "../hooks/reduxHooks";
import { AddCommentForm } from "./AddCommentForm";
import { CommentsList } from "./CommentsList";

type Props = {
  postId: number;
  setCommentCounter: Dispatch<SetStateAction<number>>;
};

export const CommentSection: FC<Props> = ({ postId, setCommentCounter }) => {
  const [comments, setComments] = useState<CommentInfo[]>([]);
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
