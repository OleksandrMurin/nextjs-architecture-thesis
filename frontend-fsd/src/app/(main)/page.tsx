import { getAllPosts } from "@/entities/post";
import { GetPostsParams } from "@/entities/post/model/types";
import { getAllCategories } from "@/features/create-post/api/get-categories";
import FeedControlsBar from "@/features/post-feed-controls/ui/FeedControlsBar";
import { PostFeed } from "@/widgets/post-feed";

import { Container, Stack } from "@mui/material";

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
          <PostFeed posts={posts} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default FeedPage;
