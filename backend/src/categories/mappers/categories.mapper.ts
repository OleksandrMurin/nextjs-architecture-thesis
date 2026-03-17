import { CategoryResponseDto } from '../dto/category-response.dto';
import { Category } from '../entities/category.entity';

export function mapCategoryToResponse(category: Category): CategoryResponseDto {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

export function mapCategoriesToResponse(
  categories: Category[],
): CategoryResponseDto[] {
  return categories.map(mapCategoryToResponse);
}
