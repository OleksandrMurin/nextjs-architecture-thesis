import { getAllPosts } from "@/api/server/postServerApi";
import { PostCard } from "@/components/PostCard";
import { Container, Stack } from "@mui/material";

const UserPostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
};

export default UserPostsPage;
