import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'test' })
  @IsString()
  @MinLength(1)
  text: string;
}
