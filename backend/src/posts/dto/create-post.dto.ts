import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'blah-blah-blah' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'sdfsdfsfdsf_image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
