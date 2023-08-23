import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { AppService } from './app.service';
import { rootContract } from './contract';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TsRestHandler(rootContract)
  handler() {
    return tsRestHandler(rootContract, {
      getHello: async () => {
        return {
          status: 200,
          body: this.appService.getHello(),
        };
      },
    });
  }
}
