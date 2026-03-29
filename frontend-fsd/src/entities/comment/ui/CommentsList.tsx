import { Stack } from "@mui/material";
import type { FC } from "react";

import { Comment } from "../model/types";
import { CommentItem } from "./CommentItem";

type Props = {
  comments: Comment[];
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
