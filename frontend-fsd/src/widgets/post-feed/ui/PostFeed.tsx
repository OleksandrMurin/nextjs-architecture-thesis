import { Post } from "@/entities/post";
import { Stack } from "@mui/material";
import PostFeedItem from "./PostFeedItem";

type Props = {
  posts: Post[];
};

export function PostFeed({ posts }: Props) {
  return (
    <Stack spacing={3}>
      {posts.map((post) => (
        <PostFeedItem key={post.id} post={post} />
      ))}
    </Stack>
  );
}
