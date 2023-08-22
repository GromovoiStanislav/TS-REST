import { initClient } from '@ts-rest/core';
import { contract, Post } from './contract';

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});

async function run() {
  let id: string;

  {
    const { body, status }: { body: Post; status: number } =
      await client.posts.createPost({
        body: { description: 'new description', title: 'new title' },
      });
    console.log(status, body);
    id = body.id;
  }

  {
    const { body, status } = await client.posts.getPosts();
    console.log(status, body);
  }

  {
    const { body, status } = await client.posts.getPost({ params: { id } });
    console.log(status, body);
  }
}

run();
