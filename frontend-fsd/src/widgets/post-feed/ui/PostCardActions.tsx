"use client";

import { User } from "@/entities/user/model/types";
import { useAppSelector } from "@/hooks/reduxHooks";

import DeletePostButton from "@/features/delete-post/ui/DeletePostButton";
import PostLikeButton from "@/features/toggle-post-like/ui/PostLikeButton";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  Box,
  CardActions,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { PostCommentsSection } from "./PostCommentsSection";

type Props = {
  commentCount: number;
  likesCount: number;
  likedByMe: boolean;
  user: User;
  id: number;
};

const PostCardActions: FC<Props> = (
  { commentCount, likesCount, likedByMe, user, id },
  ...props
) => {
  const userId = useAppSelector((state) => state.users.user?.id);
  const [isActive, setIsActive] = useState(false);
  const [commentCounter, setCommentCounter] = useState(commentCount);
  return (
    <Box {...props}>
      <CardActions sx={{ px: 2, pb: isActive ? 0 : 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">Comments</Typography>
            <Chip label={commentCounter} size="medium" />
          </Stack>

          <Stack direction="row" spacing={1}>
            <PostLikeButton
              postId={id}
              initialLikedByMe={likedByMe}
              initialLikeCount={likesCount}
            />
            <IconButton
              size="small"
              aria-label="toggle comments"
              onClick={() => setIsActive((prev) => !prev)}
              sx={{
                bgcolor: isActive ? "action.selected" : "transparent",
                p: 1,
                borderRadius: isActive ? "8px 8px 0 0" : 2,
                "&:hover": {
                  bgcolor: isActive ? "action.selected" : "action.hover",
                },
                "&:focus": { outline: "none" },
                "&.Mui-focusVisible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              }}
            >
              <InsertCommentOutlinedIcon />
            </IconButton>
            {userId === user.id && <DeletePostButton postId={id} />}
          </Stack>
        </Stack>
      </CardActions>
      {isActive && (
        <Box
          sx={{
            bgcolor: "action.selected",
            borderRadius: "0 0 8px 8px",
            px: 2,
            py: 1.5,
          }}
        >
          <PostCommentsSection
            postId={id}
            setCommentCounter={setCommentCounter}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostCardActions;
