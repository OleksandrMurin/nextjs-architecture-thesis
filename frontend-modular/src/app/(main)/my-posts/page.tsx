import { getMyPosts } from "@/modules/post/api/server/postServerApi";
import { PostCard } from "@/modules/post/components/PostCard";
import { Container, Stack } from "@mui/material";

const UserPostsPage = async () => {
  const posts = await getMyPosts();

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 5 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
};

export default UserPostsPage;
