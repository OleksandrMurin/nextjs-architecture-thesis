import { getMyPosts } from "@/modules/post/api/server/postServerApi";
import { PostCard } from "@/modules/post/components/PostCard";
import { getSSRCookie } from "@/shared/lib/cookies";
import { Container, Stack } from "@mui/material";
import { cookies } from "next/headers";

const UserPostsPage = async () => {
  const posts = await getMyPosts();
  const cookieStore = await cookies();
  const currentUser = await getSSRCookie("user", cookieStore);

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 5 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} userId={currentUser.id} />
        ))}
      </Stack>
    </Container>
  );
};

export default UserPostsPage;
