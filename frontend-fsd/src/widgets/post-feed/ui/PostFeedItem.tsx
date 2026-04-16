import { Post, PostCard } from "@/entities/post";
import EditPostButton from "@/features/update-post/ui/EditPostButton";
import { getSSRCookie } from "@/shared/lib/cookies";
import { CardProps } from "@mui/material";
import { cookies } from "next/headers";
import PostCardActions from "./PostCardActions";

type PostFeedItemProps = {
  post: Post;
} & Omit<CardProps, "children">;

export default async function PostFeedItem({
  post,
  ...cardProps
}: PostFeedItemProps) {
  const cookieStore = await cookies();
  const currentUser = await getSSRCookie("user", cookieStore);
  return (
    <PostCard
      post={post}
      imageOverlay={
        currentUser?.id === post.user.id ? (
          <EditPostButton postId={post.id} />
        ) : null
      }
      {...cardProps}
    >
      <PostCardActions
        commentCount={post.commentCount}
        likesCount={post.likesCount}
        likedByMe={post.likedByMe}
        user={post.user}
        id={post.id}
      />
    </PostCard>
  );
}
