import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  async getAll(postId: number) {
    return this.commentsRepo.find({ where: { postId } });
  }

  async create(userId: number, postId: number, text: string) {
    const post = await this.postsRepo.findOne({
      where: { id: postId },
    });
    if (!post) throw new NotFoundException('There is no post with such id');
    const savedComment = await this.commentsRepo.save({
      userId,
      postId,
      text,
    });
    const comment = await this.commentsRepo.findOne({
      where: { id: savedComment.id },
      relations: { user: true },
    });
    return {
      id: comment!.id,
      text: comment!.text,
      createdAt: comment!.createdAt,
      postId: comment!.postId,
      user: { id: comment!.user.id, username: comment!.user.username },
    };
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentsRepo.findOne({ where: { id } });
    if (!comment)
      throw new NotFoundException('There is no comment with such id');
    if (comment.userId !== userId)
      throw new ForbiddenException('This is not your comment');
    await this.commentsRepo.remove(comment);
    return { success: true };
  }
}
