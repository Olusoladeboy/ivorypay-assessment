import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TransactionModule, TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "iv-assessment-db.cluster-cuzjlcl29nhs.us-west-2.rds.amazonaws.com",
    "port": 5432,
    "username": "postgres",
    "password": "a6ymn9Z6wy7GwboRB9hr",
    "database": "postgres",
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ],
    "synchronize": true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
