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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { RequestWithUser } from 'src/common/types/request-with-user.type';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
@ApiTags('Comments')
@ApiBearerAuth('access-token')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all comments for post by id' })
  @ApiOkResponse({ type: CommentResponseDto, isArray: true })
  getAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getAll(postId);
  }

  @Post()
  @ApiOperation({ summary: 'Create comment for post with id from params' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentResponseDto })
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: RequestWithUser,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(req.user!.userId, postId, dto.text);
  }

  //TODO Add proper documentation
  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment by id' })
  @UseGuards(AuthGuard('jwt'))
  removeComment(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.remove(id, req.user!.userId);
  }
}
