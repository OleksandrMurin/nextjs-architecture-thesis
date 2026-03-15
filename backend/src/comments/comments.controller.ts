import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
@ApiTags('Comments')
@ApiBearerAuth('access-token')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all comments for post by id' })
  getAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getAll(postId);
  }

  @Post()
  @ApiOperation({ summary: 'Create comment for post with id from params' })
  @UseGuards(AuthGuard('jwt'))
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: any,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(req.user.userId, postId, dto.text);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment by id' })
  @UseGuards(AuthGuard('jwt'))
  removeComment(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id, req.user.userId);
  }
}
