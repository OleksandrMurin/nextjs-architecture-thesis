"use client";

import { deletePostById } from "@/api/postActions";
import { useAppSelector } from "@/hooks/reduxHooks";
import { UserInfo } from "@/types/userTypes";
import { Delete } from "@mui/icons-material";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import {
  Box,
  CardActions,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { CommentSection } from "./CommentSection";

type Props = {
  commentCount: number;
  user: UserInfo;
  id: number;
};

const CardsActionSection: FC<Props> = (
  { commentCount, user, id },
  ...props
) => {
  const userId = useAppSelector((state) => state.users.user?.id);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [commentCounter, setCommentCounter] = useState(commentCount);
  const onDelete = async () => {
    try {
      await deletePostById(id);
      router.refresh();
    } catch (e) {
      console.log(`Error ${e} occurred in deletePostById`);
    }
  };
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
            {userId === user.id && (
              <IconButton
                size="small"
                color="error"
                aria-label="delete post"
                onClick={onDelete}
              >
                <Delete />
              </IconButton>
            )}
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
          <CommentSection postId={id} setCommentCounter={setCommentCounter} />
        </Box>
      )}
    </Box>
  );
};

export default CardsActionSection;
