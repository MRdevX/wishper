import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/common/filters/http-exception.filter';
import { ResponseInterceptor } from './app/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');
  const logger = new Logger('Bootstrap');

  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const port = appConfig.port;
  const host = appConfig.host;

  logger.log('🚀 Starting NestJS application...');
  logger.log(`📍 Server will be running on: http://${host}:${port}`);
  logger.log(`🌐 API endpoint: http://${host}:${port}/api`);

  await app.listen(port, host);

  logger.log(`✅ NestJS application is running on port ${port}`);
  logger.log(`🎯 API is available at: http://${host}:${port}/api`);
}

bootstrap();
