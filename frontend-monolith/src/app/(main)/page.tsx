import { getAllCategories } from "@/api/server/categoryServerApi";
import { getAllPosts } from "@/api/server/postServerApi";
import FeedControlsBar from "@/components/FeedControlsBar";
import { PostCard } from "@/components/PostCard";
import { Container, Stack } from "@mui/material";

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
            return <PostCard key={post.id} post={post} />;
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

export default FeedPage;
