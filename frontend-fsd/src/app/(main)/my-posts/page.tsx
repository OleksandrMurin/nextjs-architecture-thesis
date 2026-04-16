import { getMyPosts } from "@/entities/post";
import { PostFeed } from "@/widgets/post-feed";
import { Stack } from "@mui/material";

const UserPostsPage = async () => {
  const posts = await getMyPosts();

  return (
    <Stack spacing={3} alignItems="center">
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        <PostFeed posts={posts} />
      </Stack>
    </Stack>
  );
};

export default UserPostsPage;
