import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'History' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'history' })
  @IsString()
  @MinLength(1)
  slug: string;
}
