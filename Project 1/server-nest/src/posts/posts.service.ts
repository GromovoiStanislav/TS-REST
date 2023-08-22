import { Injectable } from '@nestjs/common';
import { Post, CreatePostSchema } from './contract';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PostsService {
  posts: Post[] = [
    {
      id: '1',
      title: 'title 1',
      description: 'body1',
    },
    {
      id: '2',
      title: 'title 2',
      description: 'body2',
    },
  ];

  async findAll() {
    return this.posts;
  }

  async findOne(id: string) {
    return this.posts.find((post) => post.id === id);
  }

  async createPost({ title, description }: z.infer<typeof CreatePostSchema>) {
    const newPost: Post = {
      id: randomUUID(),
      title,
      description,
    };

    this.posts.push(newPost);

    return newPost;
  }
}
