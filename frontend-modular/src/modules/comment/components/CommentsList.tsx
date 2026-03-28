import { Stack } from "@mui/material";
import type { FC } from "react";

import { CommentInfo } from "../types";
import { CommentItem } from "./CommentItem";

type Props = {
  comments: CommentInfo[];
  onDelete: (id: number) => void;
};

export const CommentsList: FC<Props> = ({ comments, onDelete }) => {
  return (
    <Stack gap={1}>
      {comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          user={comment.user}
          createdAt={comment.createdAt}
          text={comment.text}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};
