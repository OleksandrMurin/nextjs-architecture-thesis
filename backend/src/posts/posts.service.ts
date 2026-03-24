import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostQueryDto } from './dto/get-query-params.dto';
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
      relations: { user: true, comments: true, category: true, likes: true },
    });
    return mapPostToResponse(savedWithUser!, params.userId);
  }

  async findAll(query: GetPostQueryDto, userId: number | null) {
    const allowedSortFields = {
      createdAt: 'post.createdAt',
      id: 'post.id',
    };

    const search = query.search?.trim();
    const category = query.category?.trim();
    const sortField: string = query.sortBy
      ? allowedSortFields[query.sortBy]
      : 'post.createdAt';
    const order = query.order ?? 'DESC';

    const qb = this.postRepo.createQueryBuilder('post');

    qb.leftJoinAndSelect('post.user', 'user');
    qb.leftJoinAndSelect('post.comments', 'comments');
    qb.leftJoinAndSelect('post.category', 'category');
    qb.leftJoinAndSelect('post.likes', 'likes');

    if (search) {
      qb.andWhere('post.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category) {
      qb.andWhere('category.slug = :category', {
        category: category,
      });
    }

    qb.orderBy(sortField, order);

    const posts = await qb.getMany();
    return mapPostsToResponse(posts, userId);
  }

  async findAllUsersPosts(userId: number) {
    const posts = await this.postRepo.find({
      where: { userId: userId },
      relations: {
        user: true,
        comments: true,
        category: true,
        likes: true,
      },
    });
    return mapPostsToResponse(posts, userId);
  }

  async findOne(id: number, userId: number | null) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: {
        user: true,
        comments: true,
        category: true,
        likes: true,
      },
    });
    if (!post) throw new NotFoundException('post was not found');
    return mapPostToResponse(post, userId);
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
