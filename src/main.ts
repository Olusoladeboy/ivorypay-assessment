import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
