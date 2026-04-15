import { getAllCategories } from "@/modules/post/api/server/categoryServerApi";
import { getAllPosts } from "@/modules/post/api/server/postServerApi";
import FeedControlsBar from "@/modules/post/components/FeedControlsBar";
import { PostCard } from "@/modules/post/components/PostCard";
import { getSSRCookie } from "@/shared/lib/cookies";
import { Container, Stack } from "@mui/material";
import { cookies } from "next/headers";

export type GetPostsParams = {
  search?: string;
  sortBy?: "createdAt";
  order?: "ASC" | "DESC";
  category?: string;
};

type Props = {
  searchParams: Promise<GetPostsParams>;
};

const FeedPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const posts = await getAllPosts(params);
  const categories = await getAllCategories();
  const cookieStore = await cookies();
  const currentUser = await getSSRCookie("user", cookieStore);

  return (
    <Container
      sx={{
        py: 4,
        mt: 8,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <FeedControlsBar categories={categories} />

        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 500,
          }}
        >
          {posts.map((post) => {
            return (
              <PostCard key={post.id} post={post} userId={currentUser.id} />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

export default FeedPage;
