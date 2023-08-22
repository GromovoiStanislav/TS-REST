import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const CreatePostSchema = PostSchema.omit({ id: true });

export type Post = z.infer<typeof PostSchema>;

const postContract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: CreatePostSchema,
    summary: 'Create a post',
    description: 'description: Create a post',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a post by id',
    description: 'description: Get a post by id',
    strictStatusCodes: true,
  },
  getPosts: {
    method: 'GET',
    path: `/posts`,
    responses: {
      200: z.array(PostSchema),
    },
    summary: 'Get all posts',
    description: 'description: Get all posts',
    strictStatusCodes: true,
  },
});

export const contract = c.router({
  posts: postContract,
});
