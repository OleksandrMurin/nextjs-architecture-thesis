import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { ReactNode } from "react";
import { Post } from "../model/types";

type PostCardProps = {
  post: Post;
  imageOverlay?: ReactNode;
  children?: ReactNode;
} & CardProps;

export function PostCard({
  post,
  imageOverlay,
  children,
  ...cardProps
}: PostCardProps) {
  const { description, user, createdAt } = post;
  const DefaultPostImage =
    "https://www.meme-arsenal.com/memes/3f8a7bfb021037f1187702e0cc9d1680.jpg";

  return (
    <Card {...cardProps}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="260"
          src={DefaultPostImage}
          alt={description}
        />
        {imageOverlay}
      </Box>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle2">
            Posted by: <i>{user.userName}</i>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <Chip label={post.category.name} size="medium" sx={{ mb: 1.5 }} />
        <Divider />
        <Box
          sx={{
            p: 1,
            bgcolor: "action.hover",
            borderLeft: "4px solid",
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              overflowWrap: "anywhere",
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
      {children}
    </Card>
  );
}
