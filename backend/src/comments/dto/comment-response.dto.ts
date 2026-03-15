import { ApiProperty } from '@nestjs/swagger';
import { AuthorResponseDto } from 'src/common/dto/author-response.dto';

export class CommentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'some text' })
  text: string;
  @ApiProperty({ example: '2026-03-15T15:36:53.997Z' })
  createdAt: Date;
  @ApiProperty({ example: 1 })
  postId: number;
  @ApiProperty({ type: AuthorResponseDto })
  user: AuthorResponseDto;
}
