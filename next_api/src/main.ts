import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/fileView/',
  });
  app.use(
    session({
      secret: '签名',
      rolling: true,
      name: 'sid',
      cookie: {
        httpOnly: true,
        maxAge: 999999,
      },
    }),
  );
  await app.listen(4230);
}
bootstrap();
