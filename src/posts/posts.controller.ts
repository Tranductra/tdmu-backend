import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { Post as PostModel } from './dto/post.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Get all posts
  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  // Get post by ID
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  // Get posts with pagination
  @Get('pagination')
  async getPostsByPagination(
    @Query('limit') limit: number,
    @Query('lastVisiblePostId') lastVisiblePostId?: string,
  ) {
    return this.postService.getPostsByPagination(limit, lastVisiblePostId);
  }

  // Create a new post
  @Post()
  async createPost(@Body() post: PostModel) {
    return this.postService.createPost(post); // Trả về bài viết đã được tạo
  }

  // Update a post by ID
  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string', example: 'A sample post' },
        uid: { type: 'string', example: '12345' },
        username: { type: 'string', example: 'john_doe' },
        dataPublished: { type: 'string', example: '2024-08-24T10:00:00Z' },
        postUrl: { type: 'string', example: 'https://example.com/post.jpg' },
        profImage: {
          type: 'string',
          example: 'https://example.com/profile.jpg',
        },
        likes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              uid: { type: 'string', example: 'user123' },
            },
          },
          example: [{ uid: 'user123' }, { uid: 'user456' }],
        },
      },
      required: [
        'description',
        'uid',
        'username',
        'dataPublished',
        'postUrl',
        'profImage',
      ],
    },
  })
  async updatePost(@Param('id') id: string, @Body() post: Partial<PostModel>) {
    return this.postService.updatePost(id, post);
  }

  // Delete a post by ID
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
