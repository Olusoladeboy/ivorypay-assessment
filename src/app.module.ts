import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TransactionModule,
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.POSTGRES_URI,
      "port": 5432,
      "username": process.env.POSTGRES_USER,
      "password": process.env.POSTGRES_PASSWORD,
      "database": process.env.POSTGRES_DB,
      "entities": [
        "dist/**/*.entity{.ts,.js}"
      ],
      "synchronize": true
    }),
    CacheModule.register({
      isGlobal: true,
      isDebug: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 300, // cache TTL in secondss
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
