import { getAllPosts } from "@/entities/post";
import { getAllCategories } from "@/features/create-post/api/get-categories";
import { PostFeed } from "@/widgets/post-feed";
import FeedControlsBar from "@/widgets/post-feed/ui/FeedControlsBar";
import { Container } from "@mui/material";

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
      <PostFeed posts={posts} />
    </Container>
  );
};

export default FeedPage;
