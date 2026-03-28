import { getAllPosts } from "@/modules/post/api/server/postServerApi";
import { PostCard } from "@/modules/post/components/PostCard";
import { Container, Stack } from "@mui/material";

const FeedPage = async () => {
  const posts = await getAllPosts();

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 5 }}>
      <Stack spacing={3}>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Stack>
    </Container>
  );
};

export default FeedPage;
