import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from './contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openApiDocument = generateOpenApi(contract, {
    info: {
      title: 'Posts API',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('/', app, openApiDocument);

  await app.listen(3000);
}
bootstrap();
