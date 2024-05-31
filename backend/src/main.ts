import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig, corsConfig } from '@/src/config';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  await app.listen(EnvConfig().port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
