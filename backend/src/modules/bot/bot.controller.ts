import { Body, Controller, Get, Logger, OnModuleInit, Post, UseGuards } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from '../../lib/config';
import { BotService as BotProtoService, ConversationService } from '../../types/api-grpc/src/main/proto/api';
import { ReplaySubject } from 'rxjs';
import { SQBotCommand } from '../../types/bot';
import { Metadata } from '@grpc/grpc-js';
import { botJwt } from './bot.utils';
import { BotService } from './bot.service';
import { AuthGuard } from '@nestjs/passport';

/*
 * Main bot controller
 */
@Controller('bot')
export class BotController implements OnModuleInit {
  private botGrpcService: BotProtoService;
  private conversationsGrpcService: ConversationService;
  private readonly logger = new Logger('BotController');

  @Client(grpcClientOptions) private readonly client: ClientGrpc;

  constructor(private readonly botService: BotService) {}

  /*
   * Service initialization and GRPC connection on the module start
   */
  async onModuleInit() {
    try {
      this.botGrpcService = await this.client.getService<BotProtoService>('BotService');
      this.conversationsGrpcService = await this.client.getService<ConversationService>('ConversationService');

      this.connectWithImApi();
    } catch (e) {
      this.logger.error('Bot module init error', e);
    }
  }

  /*
   * Get the moderated messages
   */
  @Get('conversation-logs')
  @UseGuards(AuthGuard('basic'))
  async getConversationLogs() {
    return this.botService.getLogs();
  }

  /*
   * Get the chat room list
   */
  @Get('conversations')
  @UseGuards(AuthGuard('basic'))
  async getPairedConversations() {
    return this.botService.getPairedConversations();
  }

  /*
   * Get the blocklist
   */
  @Get('block-list')
  @UseGuards(AuthGuard('basic'))
  async getBlockList() {
    return this.botService.getBlockList();
  }

  /*
   * Edit the blocklist
   */
  @Post('block-list')
  @UseGuards(AuthGuard('basic'))
  async setBlockList(@Body('blockList') blockList: string[]) {
    await this.botService.setBlockList(blockList);
    return this.botService.getBlockList();
  }

  /*
   * Add the authorization token to metadata and subscribe to events to work with the IM API
   */
  connectWithImApi() {
    const meta = new Metadata();
    /*
     * Authorization token. An example of the token issue is shown in the issueBotApiJwt method
     */
    meta.add('Authorization', `Bearer ${botJwt}`);
    const subject = new ReplaySubject<SQBotCommand>();

    /*
     * ConnectWithSQ is a bidirectional stream. We can both receive events and send them over the same connection
     */
    const connection = this.botGrpcService.ConnectWithSQ(subject, meta);
    connection.subscribe({
      next: (message) => {
        /*
         * Main event handler
         */
        this.botService.onConnectMessage(message, subject);
      },
      complete: () => this.logger.verbose('connection completed'),
      error: (err: any) => this.logger.error('connection error', err),
    });
  }
}
