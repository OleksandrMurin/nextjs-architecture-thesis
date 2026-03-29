import { Post } from "@/entities/post";
import { Container, Stack } from "@mui/material";
import PostFeedItem from "./PostFeedItem";

type Props = {
  posts: Post[];
};

export function PostFeed({ posts }: Props) {
  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 5 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostFeedItem key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
