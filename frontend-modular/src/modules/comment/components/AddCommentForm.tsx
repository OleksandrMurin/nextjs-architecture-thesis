"use client";

import { Button, Paper, Stack, TextField } from "@mui/material";
import { useState, type FC } from "react";

type AddCommentFormProps = {
  onAddComment: (text: string) => void;
  loading?: boolean;
};

export const AddCommentForm: FC<AddCommentFormProps> = ({
  onAddComment,
  loading,
}) => {
  const [text, setText] = useState("");

  function handleSubmit(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText("");
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <TextField
          multiline
          minRows={2}
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />

        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit(text);
              setText("");
            }}
            disabled={loading || !text.trim()}
          >
            Post
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
