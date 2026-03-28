import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Charlie Kirk' })
  userName: string;
}
