import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { Post } from "@/types/apiTypes";
import CardsActionSection from "./CardsActionSection";

//TODO change post type to Post instead of Post in further iterations of project
type PostCardProps = {
  post: Post;
} & Omit<CardProps, "children">;

export function PostCard({ post, ...cardProps }: PostCardProps) {
  const { id, description, user, commentCount, createdAt } = post;
  const DefaultPostImage =
    "https://www.meme-arsenal.com/memes/3f8a7bfb021037f1187702e0cc9d1680.jpg";

  return (
    <Card {...cardProps}>
      <CardMedia
        component="img"
        height="260"
        src={DefaultPostImage}
        alt={description}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle2">
            Posted by: <i>{user.userName}</i>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
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
      <CardsActionSection commentCount={commentCount} user={user} id={id} />
    </Card>
  );
}
