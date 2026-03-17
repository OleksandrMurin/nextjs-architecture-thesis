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
    categoryId: number;
  }) {
    const saved = await this.postRepo.save({
      imageUrl: params.imageUrl,
      userId: params.userId,
      description: params.description,
      categoryId: params.categoryId,
    });
    const savedWithUser = await this.postRepo.findOne({
      where: { id: saved.id },
      relations: { user: true, comments: true, category: true },
    });
    return mapPostToResponse(savedWithUser!);
  }

  async findAll() {
    const posts = await this.postRepo.find({
      relations: {
        user: true,
        comments: true,
        category: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return mapPostsToResponse(posts);
  }

  async findAllUsersPosts(userId: number) {
    const posts = await this.postRepo.find({
      where: { userId: userId },
      relations: {
        user: true,
        comments: true,
        category: true,
      },
    });
    return mapPostsToResponse(posts);
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: {
        user: true,
        comments: true,
        category: true,
      },
    });
    if (!post) throw new NotFoundException('post was not found');
    return mapPostToResponse(post);
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
