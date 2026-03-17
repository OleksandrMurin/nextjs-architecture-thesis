import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { v4 as uuidv4 } from 'uuid';
import { PostResponseDto } from './dto/post-response.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@ApiBearerAuth('access-token')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  getAll() {
    return this.postsService.findAll();
  }

  @Get('my-posts')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all posts of current user' })
  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  getUserPosts(@Req() req: any) {
    return this.postsService.findAllUsersPosts(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one post by id' })
  @ApiOkResponse({ type: PostResponseDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);
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
  deletePost(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.postsService.remove(id, req.user.userId);
  }
}
