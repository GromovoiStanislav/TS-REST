import { initContract } from '@ts-rest/core';
import { apiBlog } from './posts/contract';
import { z } from 'zod';

const c = initContract();

export const rootContract = c.router({
  getHello: {
    method: 'GET',
    path: '/',
    responses: {
      200: z.string(),
    },
  },
});

export const contract = c.router({
  root: rootContract,
  posts: apiBlog,
});
