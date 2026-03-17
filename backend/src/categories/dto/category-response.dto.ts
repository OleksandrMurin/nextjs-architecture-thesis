import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'History' })
  name: string;

  @ApiProperty({ example: 'history' })
  slug: string;
}
