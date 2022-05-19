import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from './connection-options';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions)],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
