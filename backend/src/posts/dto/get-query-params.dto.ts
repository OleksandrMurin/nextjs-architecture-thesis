import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPostQueryDto {
  @ApiProperty({ required: false, example: 'react' })
  @IsOptional()
  @IsString()
  search?: string;
}
