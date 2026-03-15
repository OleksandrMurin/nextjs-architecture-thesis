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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@ApiBearerAuth('access-token')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Successfully returned posts' })
  getAll() {
    return this.postsService.findAll();
  }

  @Get('my-posts')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all posts of current user' })
  getUserPosts(@Req() req: any) {
    return this.postsService.findAllUsersPosts(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one post by id' })
  @ApiResponse({ status: 200, description: 'Successfully returned post' })
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
      },
      required: ['description'],
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
  create(
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const imageUrl = file ? file.filename : null;

    return this.postsService.create({
      description,
      imageUrl,
      userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one post by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted post' })
  deletepost(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.postsService.remove(id, req.user.userId);
  }
}
