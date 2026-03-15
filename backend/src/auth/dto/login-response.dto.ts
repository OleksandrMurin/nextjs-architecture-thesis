import { ApiProperty } from '@nestjs/swagger';
import { AuthorResponseDto } from 'src/common/dto/author-response.dto';

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt-token' })
  accessToken: string;

  @ApiProperty({ type: AuthorResponseDto })
  user: AuthorResponseDto;
}
