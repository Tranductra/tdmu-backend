import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';

@Module({
  controllers: [PostController],
  providers: [PostService]
})
export class PostsModule {}
