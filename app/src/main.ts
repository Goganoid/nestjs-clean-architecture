import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './adapter/errors/api-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { otelSDK } from './infrastructure/monitoring/otel/instrumentation';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const CORS_ORIGINS = process.env.CORS_ORIGINS;

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Spaceship API')
    .setVersion('1.0')
    .addTag('spaceship')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (CORS_ORIGINS) {
    const corsOptions: CorsOptions = {
      origin: CORS_ORIGINS!.split(','),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    app.enableCors(corsOptions);
  }

  await app.listen(8001);
}
bootstrap();
