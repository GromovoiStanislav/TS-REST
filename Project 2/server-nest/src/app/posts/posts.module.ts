import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
