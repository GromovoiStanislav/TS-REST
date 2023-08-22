import { initContract } from '@ts-rest/core';
import { postContract } from './posts/contract';
import { z } from 'zod';

const c = initContract();

export const contract = c.router({
  posts: postContract,
});
