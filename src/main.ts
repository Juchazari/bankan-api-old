import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as awsSdkConfig } from 'aws-sdk';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.set('trust proxy', 1);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  const openApiConfig = new DocumentBuilder()
    .setTitle('Bankan API')
    .setVersion('1.0')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, openApiDocument);

  awsSdkConfig.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SCRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION')
  });

  await app.listen(3000);
}

bootstrap();
