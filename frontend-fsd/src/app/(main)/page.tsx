import { getAllPosts } from "@/entities/post";
import { PostFeed } from "@/widgets/post-feed";

const FeedPage = async () => {
  const posts = await getAllPosts();

  return <PostFeed posts={posts} />;
};

export default FeedPage;
