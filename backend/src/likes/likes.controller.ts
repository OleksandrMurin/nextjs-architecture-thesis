import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@ApiBearerAuth('access-token')
@Controller('posts')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Toggle like on post by id' })
  async toggle(@Req() req: any, @Param('id', ParseIntPipe) postId: number) {
    return this.likesService.toggle(req.user.userId, postId);
  }
}
