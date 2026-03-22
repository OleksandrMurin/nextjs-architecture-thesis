import { PostResponseDto } from '../dto/post-response.dto';
import { Post } from '../entities/post.entity';

export function mapPostToResponse(
  post: Post,
  userId: number | null,
): PostResponseDto {
  const likeByMe = post.likes
    ? post.likes.some(
        (like) => like.postId === post.id && like.userId === userId,
      )
    : false;
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    description: post.description,
    createdAt: post.createdAt,
    user: { id: post.user.id, username: post.user.username },
    category: {
      id: post.category.id,
      name: post.category.name,
      slug: post.category.slug,
    },
    commentCount: post.comments?.length ?? 0,
    likesCount: post.likes?.length ?? 0,
    likedByMe: likeByMe,
  };
}

export function mapPostsToResponse(
  posts: Post[],
  userId: number | null,
): PostResponseDto[] {
  return posts.map((post) => mapPostToResponse(post, userId));
}
