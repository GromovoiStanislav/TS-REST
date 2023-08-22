import { Controller, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { postContract as contract } from './contract';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @TsRestHandler(contract.createPost)
  // async createPost() {
  //   return tsRestHandler(contract.createPost, async ({ body }) => {
  //     const post = await this.postsService.createPost(body);
  //     return { status: 201, body: post };
  //   });
  // }

  // @TsRestHandler(contract.getPost)
  // async getPost() {
  //   return tsRestHandler(contract.getPost, async ({ params: { id } }) => {
  //     const post = await this.postsService.findOne(id);

  //     if (!post) {
  //       return { status: 404, body: null };
  //     }

  //     return { status: 200, body: post };
  //   });
  // }

  // @TsRestHandler(contract.getPosts)
  // async getPosts(@Req() req: Request) {
  //   return tsRestHandler(contract.getPosts, async () => {
  //      console.log(req.headers);
  //     const posts = await this.postsService.findAll();
  //     return { status: 200, body: posts };
  //   });
  // }

  @TsRestHandler(contract)
  async handler(@Req() req: Request) {
    return tsRestHandler(contract, {
      createPost: async ({ body }) => {
        const post = await this.postsService.createPost(body);
        return { status: 201, body: post };
      },

      getPost: async ({ params: { id } }) => {
        const post = await this.postsService.findOne(id);
        if (!post) {
          return { status: 404, body: null };
        }
        return { status: 200, body: post };
      },

      getPosts: async () => {
        console.log(req.headers);
        const posts = await this.postsService.findAll();
        return { status: 200, body: posts };
      },
    });
  }
}
