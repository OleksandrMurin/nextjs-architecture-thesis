import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import type { RequestWithUser } from 'src/common/types/request-with-user.type';
import { v4 as uuidv4 } from 'uuid';
import { GetPostQueryDto } from './dto/get-query-params.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@ApiBearerAuth('access-token')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  getAll(@Req() req: RequestWithUser, @Query() query: GetPostQueryDto) {
    return this.postsService.findAll(query, req.user?.userId ?? null);
  }

  @Get('my-posts')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all posts of current user' })
  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  getUserPosts(@Req() req: RequestWithUser) {
    return this.postsService.findAllUsersPosts(req.user!.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one post by id' })
  @ApiOkResponse({ type: PostResponseDto })
  async getById(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const post = await this.postsService.findOne(id, req.user?.userId ?? null);
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create post with image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        description: { type: 'string' },
        categoryId: { type: 'string' },
      },
      required: ['image', 'description', 'categoryId'],
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, uniqueFileName);
        },
      }),
    }),
  )
  @ApiOkResponse({ type: PostResponseDto })
  create(
    @Body('description') description: string,
    @Body('categoryId') categoryId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const imageUrl = file.filename;

    return this.postsService.create({
      description,
      imageUrl,
      userId,
      categoryId: Number(categoryId),
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one post by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted post' })
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.postsService.remove(id, req.user!.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update one post by id' })
  @ApiOkResponse({ type: PostResponseDto })
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto, req.user!.userId);
  }
}
