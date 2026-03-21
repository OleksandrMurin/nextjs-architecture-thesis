import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPostQueryDto {
  @ApiProperty({ required: false, example: 'react' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ required: false, example: 'DESC' })
  @IsOptional()
  order?: 'ASC' | 'DESC';
}
