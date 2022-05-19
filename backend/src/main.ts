import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions, httpPort } from './lib/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule, { cors: true });
  app.connectMicroservice(grpcClientOptions);
  await app.listen(httpPort);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
