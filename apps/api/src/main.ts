import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');

  // const environment = appConfig.env;
  const apiPrefix = '/api';

  app.enableShutdownHooks();

  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.startAllMicroservices();

  await app.listen(appConfig.port, appConfig.host);
  // const appUrl = await app.getUrl();
  // console.info(`Application is running on: ${appUrl}`);
  // console.info(`Environment: ${environment}`);
}

process.nextTick(bootstrap);
