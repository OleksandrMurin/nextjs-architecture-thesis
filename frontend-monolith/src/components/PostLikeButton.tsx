"use client";

import { togglePostLike } from "@/api/postActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

type Props = {
  postId: number;
  initialLikedByMe: boolean;
  initialLikeCount: number;
};

const PostLikeButton: FC<Props> = ({
  postId,
  initialLikedByMe,
  initialLikeCount,
}) => {
  const [likedByMe, setLikedByMe] = useState(initialLikedByMe);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async () => {
    if (isLoading) return;

    const prevLikedByMe = likedByMe;
    const prevLikeCount = likeCount;

    const optimisticLikedByMe = !prevLikedByMe;
    const optimisticLikeCount = optimisticLikedByMe
      ? prevLikeCount + 1
      : Math.max(prevLikeCount - 1, 0);

    setLikedByMe(optimisticLikedByMe);
    setLikeCount(optimisticLikeCount);
    setIsLoading(true);

    try {
      const result = await togglePostLike(postId);

      setLikedByMe(result.liked);
      setLikeCount(result.likeCount);
    } catch (e) {
      setLikedByMe(prevLikedByMe);
      setLikeCount(prevLikeCount);
      console.log(`Error ${e} occurred in togglePostLike`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <IconButton
        size="small"
        onClick={handleToggleLike}
        disabled={isLoading}
        sx={{
          color: likedByMe ? "error.main" : "text.secondary",
          p: 0.5,
        }}
      >
        {likedByMe ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {likeCount > 0 && (
        <Typography variant="body2" color="text.secondary">
          {likeCount}
        </Typography>
      )}
    </Stack>
  );
};

export default PostLikeButton;
