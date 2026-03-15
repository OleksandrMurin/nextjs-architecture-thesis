import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { mapPostsToResponse, mapPostToResponse } from './mappers/posts.mapper';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async create(params: {
    imageUrl: string;
    userId: number;
    description: string;
  }) {
    const saved = await this.postRepo.save({
      imageUrl: params.imageUrl,
      userId: params.userId,
      description: params.description,
    });
    const savedWithUser = await this.postRepo.findOne({
      where: { id: saved.id },
      relations: { user: true },
    });
    return mapPostToResponse(savedWithUser!);
  }

  async findAll() {
    const posts = await this.postRepo.find({
      relations: {
        user: true,
        comments: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return mapPostsToResponse(posts);
  }

  async findAllUsersPosts(userId: number) {
    return this.postRepo.find({ where: { userId: userId } });
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: {
        user: true,
        comments: true,
      },
    });
    if (!post) throw new NotFoundException('post was not found');
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      description: post.description,
      createdAt: post.createdAt,
      user: { id: post.user.id, username: post.user.username },
      commentCount: post.comments.length,
    };
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('post was not found');
    if (userId !== post.userId)
      throw new ForbiddenException('This is not your post');
    await this.postRepo.remove(post);
    return { success: true };
  }
}
