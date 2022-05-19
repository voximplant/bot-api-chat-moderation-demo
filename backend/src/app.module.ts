import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, BotModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
