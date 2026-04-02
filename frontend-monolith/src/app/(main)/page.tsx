import { getAllCategories } from "@/api/server/categoryServerApi";
import { getAllPosts } from "@/api/server/postServerApi";
import FeedControlsBar from "@/components/FeedControlsBar";
import { PostCard } from "@/components/PostCard";
import { Container, Stack } from "@mui/material";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

const FeedPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const category = params.category;
  const posts = await getAllPosts(category);
  const categories = await getAllCategories();

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 5 }}>
      <FeedControlsBar
        categories={categories}
        selectedCategory={category ?? "all"}
      />
      <Stack spacing={3}>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Stack>
    </Container>
  );
};

export default FeedPage;
