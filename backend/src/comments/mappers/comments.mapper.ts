import { CommentResponseDto } from '../dto/comment-response.dto';
import { Comment } from '../entities/comment.entity';

export function mapCommentToResponse(comment: Comment): CommentResponseDto {
  return {
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt,
    postId: comment.postId,
    user: { id: comment.user.id, username: comment.user.username },
  };
}

export function mapCommentsToResponse(
  comments: Comment[],
): CommentResponseDto[] {
  return comments.map(mapCommentToResponse);
}
