import { getMyPosts } from "@/entities/post";
import { PostFeed } from "@/widgets/post-feed";

const UserPostsPage = async () => {
  const posts = await getMyPosts();

  return <PostFeed posts={posts} />;
};

export default UserPostsPage;
