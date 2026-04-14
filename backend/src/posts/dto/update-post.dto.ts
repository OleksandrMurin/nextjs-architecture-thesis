import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'blah-blah-blah' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
}
