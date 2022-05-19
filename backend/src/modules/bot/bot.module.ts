import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { LogsEntity } from './logs.entity';
import { BlockListEntity } from './block-list.entity';
import { ConversationPairsEntity } from './conversation-pairs.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([LogsEntity, BlockListEntity, ConversationPairsEntity])],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
