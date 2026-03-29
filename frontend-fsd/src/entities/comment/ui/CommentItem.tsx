import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";

import { timeAgo } from "@/shared/lib/time-ago";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Comment } from "../model/types";

type Props = Comment & {
  onDelete: (id: number) => void;
};

export const CommentItem: FC<Props> = ({
  id,
  text,
  createdAt,
  user,
  onDelete,
}) => {
  const userId = useAppSelector((state) => state.users.user?.id);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={0.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" fontWeight={600}>
            {user.userName}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {timeAgo(createdAt)}
          </Typography>

          <Stack flexGrow={1} />

          {userId === user.id && (
            <IconButton size="small" onClick={() => onDelete(id)}>
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Stack>

        <Typography
          variant="body2"
          sx={{
            wordBreak: "break-word",
            bgcolor: "lightgrey",
            p: 2,
            borderRadius: 1,
            textAlign: "left",
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Paper>
  );
};
