import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import {
  mapCategoriesToResponse,
  mapCategoryToResponse,
} from './mappers/categories.mapper';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.save(createCategoryDto);
    return mapCategoryToResponse(category);
  }

  async findAll() {
    const categories = await this.categoryRepo.find();
    return mapCategoriesToResponse(categories);
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) throw new NotFoundException('No such category was found');
    return mapCategoryToResponse(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) throw new NotFoundException('No such category was found');
    await this.categoryRepo.remove(category);
    return { success: true };
  }
}
