import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepo: Repository<Like>,
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  async toggle(userId: number, postId: number) {
    const post = await this.postsRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('This post does not exist');
    const like = await this.likesRepo.findOne({
      where: { userId, postId },
    });
    if (like) {
      await this.likesRepo.remove(like);
      const count = await this.likesRepo.count({ where: { postId } });
      return { liked: false, likeCount: count };
    }
    const newLike = this.likesRepo.create({
      userId: userId,
      postId: postId,
    });
    await this.likesRepo.save(newLike);
    const count = await this.likesRepo.count({ where: { postId } });
    return { liked: true, likeCount: count };
  }
}
