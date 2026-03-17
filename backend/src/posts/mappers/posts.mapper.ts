import { PostResponseDto } from '../dto/post-response.dto';
import { Post } from '../entities/post.entity';

export function mapPostToResponse(post: Post): PostResponseDto {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    description: post.description,
    createdAt: post.createdAt,
    user: { id: post.user.id, username: post.user.username },
    commentCount: post.comments.length ?? 0,
    category: {
      id: post.category.id,
      name: post.category.name,
      slug: post.category.slug,
    },
  };
}

export function mapPostsToResponse(posts: Post[]): PostResponseDto[] {
  return posts.map(mapPostToResponse);
}
