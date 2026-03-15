import { ApiProperty } from '@nestjs/swagger';
import { AuthorResponseDto } from 'src/common/dto/author-response.dto';

export class PostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'blah-blah.jpg' })
  imageUrl: string;

  @ApiProperty({ example: 'blah-blah, cool' })
  description: string;

  @ApiProperty({ example: '2026-03-15T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: AuthorResponseDto })
  user: AuthorResponseDto;

  @ApiProperty({ example: 3 })
  commentCount: number;
}
