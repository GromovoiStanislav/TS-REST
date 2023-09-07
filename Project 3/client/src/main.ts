import { initClient } from '@ts-rest/core';
import { contract } from './contract.js';

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});

async function run() {
  let id: string;

  {
    const { body, status } = await client.root.getHello();
    // @ts-ignore
    console.log(status, await body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.createPost({
      body: {
        title: 'new title',
        description: 'new description',
        content: 'new content',
      },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
    // @ts-ignore
    id = body.id;
  }

  {
    const { body, status } = await client.posts.getPosts({
      query: { take: '10', skip: '0' },
      headers: { ['x-api-key']: 'secret', ['x-pagination']: 2 },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.getPosts({
      query: { take: '10', skip: '0', search: 'опис' },
      headers: { ['x-api-key']: 'secret', ['x-pagination']: 2 },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.updatePost({
      params: { id },
      body: {
        published: true,
      },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.getPost({
      params: { id },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.deletePost({
      params: { id },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');

  {
    const { body, status } = await client.posts.testPathParams({
      params: { id: '10', name: 'Tom' },
      query: { field: 'Aloha' },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
  }
  {
    const { body, status } = await client.posts.testPathParams({
      params: { id: '10', name: 'Tom' },
      headers: { ['x-api-key']: 'secret' },
    });
    console.log(status, body);
  }

  console.log('//////////////////////////////////');
}

run();
