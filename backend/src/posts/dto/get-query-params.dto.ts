import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

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
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @ApiProperty({ required: false, example: 'history' })
  @IsOptional()
  @IsString()
  category?: string;
}
