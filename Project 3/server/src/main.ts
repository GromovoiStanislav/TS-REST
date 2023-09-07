import fastify from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { apiBlog, Post } from './contract.js';

export const mockPostFixtureFactory = (partial: Partial<Post>): Post => ({
  id: 'mock-id',
  title: `Post`,
  content: `Content`,
  description: `Description`,
  published: true,
  tags: ['tag1', 'tag2'],
  ...partial,
});

const app = fastify({ logger: false });

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const s = initServer();

const router = s.router(apiBlog, {
  getPost: async ({ params: { id }, headers }) => {
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.getPost.metadata);

    const post = mockPostFixtureFactory({ id });

    if (!post) {
      return {
        status: 404,
        body: null,
      };
    }

    return {
      status: 200,
      body: post,
    };
  },

  getPosts: async ({ query, headers }) => {
    console.log('headers: x-pagination', headers['x-pagination']);
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.getPosts.metadata);

    const posts = [
      mockPostFixtureFactory({ id: '1' }),
      mockPostFixtureFactory({ id: '2' }),
    ];

    return {
      status: 200,
      body: {
        posts,
        count: 0,
        skip: query.skip,
        take: query.take,
      },
    };
  },

  createPost: async ({ body, headers }) => {
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.createPost.metadata);

    const post = mockPostFixtureFactory(body);

    return {
      status: 201,
      body: post,
    };
  },

  updatePost: async ({ body, headers }) => {
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.updatePost.metadata);

    const post = mockPostFixtureFactory(body);

    return {
      status: 200,
      body: post,
    };
  },

  deletePost: async ({ headers }) => {
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.deletePost.metadata);

    return {
      status: 200,
      body: { message: 'Post deleted' },
    };
  },

  testPathParams: async ({ params, headers, query: { field } }) => {
    console.log('headers: x-api-key', headers['x-api-key']);
    console.log('metadata', apiBlog.testPathParams.metadata);

    return {
      status: 200,
      body: { ...params, field },
    };
  },
});

s.registerRouter(apiBlog, router, app, {
  logInitialization: true,
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
