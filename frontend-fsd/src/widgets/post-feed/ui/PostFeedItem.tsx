import { Post, PostCard } from "@/entities/post";
import { CardProps } from "@mui/material";
import PostCardActions from "./PostCardActions";

type PostFeedItemProps = {
  post: Post;
} & Omit<CardProps, "children">;

export default function PostFeedItem({
  post,
  ...cardProps
}: PostFeedItemProps) {
  return (
    <PostCard post={post} {...cardProps}>
      <PostCardActions
        commentCount={post.commentCount}
        user={post.user}
        id={post.id}
      />
    </PostCard>
  );
}
