import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { BotCommandType, BotEventType, botEventTypeToJSON, SQBotEvent } from '../../types/bot';
import { botClientId, censoredNotificationMessage, replacePattern } from '../../lib/config';
import { extractMessageData } from './bot.utils';
import { CensorMessageTextResponse, ConversationPairMap, ProcessBotEventResult } from './bot.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsEntity } from './logs.entity';
import { BlockListEntity } from './block-list.entity';
import { ConversationPairsEntity } from './conversation-pairs.entity';

/*
 * The main demo logic is implemented in the onConnectMessage method
 */
@Injectable()
export class BotService implements OnModuleInit {
  private blockListCache = [];
  private conversationPairsCache: ConversationPairMap = {};

  private readonly logger = new Logger('BotService');
  constructor(
    @InjectRepository(LogsEntity)
    private logsEntity: Repository<LogsEntity>,

    @InjectRepository(BlockListEntity)
    private blockListEntity: Repository<BlockListEntity>,

    @InjectRepository(ConversationPairsEntity)
    private conversationPairsEntity: Repository<ConversationPairsEntity>,
  ) {}

  getPairedConversation = (conversationUUID: string) => {
    return this.conversationPairsCache[conversationUUID].linkedConversation;
  };

  getPairedConversations = () => {
    const processedPairIds = new Set<number>();
    const uniquePairs = Object.values(this.conversationPairsCache).filter((conversation) => {
      if (processedPairIds.has(conversation.pairId)) {
        return false;
      } else {
        processedPairIds.add(conversation.pairId);
        return true;
      }
    });

    const conversations = uniquePairs.map((conversation) => {
      const first = {
        userId: conversation.owner,
        conversationUUID: conversation.conversationUUID,
      };

      const second = {
        userId: conversation.linkedConversation.owner,
        conversationUUID: conversation.linkedConversation.conversationUUID,
      };

      return [first, second];
    });

    return { conversations };
  };

  async logCensoredText(params: {
    initiator: number;
    conversationUUID: string;
    originalMessage: string;
    censoredWords: string[];
  }) {
    const { initiator, censoredWords, originalMessage, conversationUUID } = params;
    const censoredWordsStr = censoredWords.join(', ');

    const dataToLog = {
      userId: initiator,
      blockedContent: censoredWordsStr,
      originalText: originalMessage,
      conversationUUID,
    };
    const entity = this.logsEntity.create(dataToLog);
    await this.logsEntity.save(entity);
  }

  async getLogs() {
    const logs = await this.logsEntity.find();
    return { logs: logs };
  }

  /*
   * When initializing the module, it is necessary to assemble the created rooms into pairs to determine where to send
   * messages in case of individual rooms.
   * Room pairs and blocklist are cached to reduce the number of requests to the database
   */
  async onModuleInit() {
    const blockListRaw = await this.blockListEntity.find();
    this.blockListCache = blockListRaw.map((blockItem) => blockItem.word);

    const preparePairsMap = (pairs: ConversationPairsEntity[]) =>
      pairs.reduce<ConversationPairMap>((acc, pair) => {
        acc[pair.conversationFirst.conversationUUID] = {
          pairId: pair.id,
          owner: pair.conversationFirst.owner,
          conversationUUID: pair.conversationFirst.conversationUUID,
          linkedConversation: {
            owner: pair.conversationSecond.owner,
            conversationUUID: pair.conversationSecond.conversationUUID,
          },
        };

        if (!acc[pair.conversationSecond.conversationUUID]) {
          acc[pair.conversationSecond.conversationUUID] = {
            pairId: pair.id,
            owner: pair.conversationSecond.owner,
            conversationUUID: pair.conversationSecond.conversationUUID,
            linkedConversation: {
              owner: pair.conversationFirst.owner,
              conversationUUID: pair.conversationFirst.conversationUUID,
            },
          };
        }

        return acc;
      }, {} as ConversationPairMap);
    const pairsRaw = await this.conversationPairsEntity.find({
      relations: ['conversationFirst', 'conversationSecond'],
    });
    this.conversationPairsCache = preparePairsMap(pairsRaw);
  }

  /*
   * Get the blocklist
   */
  getBlockList() {
    return { blockList: this.blockListCache };
  }

  /*
   * Save the blocklist to the database
   */
  async setBlockList(words: string[]) {
    const wordsObjects = words.map((word) => ({ word }));
    const entity = this.blockListEntity.create(wordsObjects);
    await this.blockListEntity.save(entity);

    this.blockListCache = words;
  }

  /*
   *
   * Message moderation method. In this demo, we look for a complete match of the words in the original
   * message and words from the blocklist. You can use any moderation logic, including an external API
   */
  censorMessageText(message: string): CensorMessageTextResponse {
    const replacedWordsSet = new Set<string>();
    let censoredText = message;

    for (const word of this.blockListCache) {
      censoredText = censoredText.replaceAll(word, () => {
        replacedWordsSet.add(word);
        return replacePattern;
      });
    }

    const censoredWords = Array.from(replacedWordsSet);

    return {
      censoredText,
      meta: {
        originalText: message,
        censoredWords,
      },
    };
  }

  getCensoredMessageRetransmissionParams = (censoredText: string, originalMessage) => {
    const { conversationUUID, initiator } = extractMessageData(originalMessage);
    const conversationToSend = this.getPairedConversation(conversationUUID);
    if (!conversationToSend || conversationToSend.conversationUUID === conversationUUID) return;

    const enrichedText = {
      text: censoredText,
      userId: initiator,
    };

    return {
      type: BotCommandType.SendMessage,
      sendMessageRequest: {
        conversationUUID: conversationToSend.conversationUUID,
        text: JSON.stringify(enrichedText),
      },
    };
  };

  getEditOriginalMessageParams = (censoredText: string, originalMessage) => {
    const { conversationUUID, messageUUID } = extractMessageData(originalMessage);

    const message = {
      type: 'EDIT_MESSAGE',
      newText: censoredText,
      originalMessage: originalMessage.messageReceivedEvent,
      sender: originalMessage.initiator,
    };

    return {
      type: BotCommandType.EditMessage,
      editMessageRequest: {
        message: {
          conversationUUID,
          messageUUID,
          text: JSON.stringify(message),
          payload: [],
        },
      },
    };
  };

  getCensoredNotificationMessageParams = (processResult, originalMessage) => {
    const { initiator, conversationUUID } = extractMessageData(originalMessage);

    const enrichedText = {
      type: 'SEND_NOTIFICATION',
      text: censoredNotificationMessage,
      userId: initiator,
    };

    return {
      type: BotCommandType.SendMessage,
      sendMessageRequest: {
        conversationUUID,
        text: JSON.stringify(enrichedText),
      },
    };
  };

  /*
   * Message processing is divided into two stages:
   * - process incoming data (processBotEvent method)
   * - decide what to do next (processResult method) based on the results of processing
   */
  onConnectMessage(message: SQBotEvent, subject) {
    this.logger.verbose('got message ', JSON.stringify(message));

    const { initiator } = extractMessageData(message);
    if (!initiator || Number(initiator) === Number(botClientId)) return;

    const result = this.processBotEvent(message);
    this.processResult(result, message, subject);
  }

  /*
   * Depending on the result of processing at the first stage, the following scenarios are possible:
   * - forward the message to the associated room (for individual rooms)
   * - send a warning that the user message contains words from the blocklist
   * - edit the original message text
   * - log an incoming message that has not passed moderation
   */
  processResult(result: ProcessBotEventResult, originalMessage: SQBotEvent, subject) {
    const { initiator, text } = extractMessageData(originalMessage);

    if (result.type === 'SEND_MESSAGE') {
      const retransmitMessage = this.getCensoredMessageRetransmissionParams(
        result.payload.censoredText,
        originalMessage,
      );
      if (retransmitMessage) subject.next(retransmitMessage);
    }

    if (result.payload.meta.censoredWords.length) {
      const notification = this.getCensoredNotificationMessageParams(result, originalMessage);
      subject.next(notification);

      const editMessage = this.getEditOriginalMessageParams(result.payload.censoredText, originalMessage);
      subject.next(editMessage);

      const { conversationUUID } = notification.sendMessageRequest;
      this.logCensoredText({
        conversationUUID,
        initiator,
        originalMessage: text,
        censoredWords: result.payload.meta.censoredWords,
      });
    }
  }

  /*
   * Main event handler for incoming events. 
   * In this demo, we process only messages of the MessageReceived type, the rest are ignored
   */
  processBotEvent(event: SQBotEvent): ProcessBotEventResult {
    this.logger.verbose(`process event ${JSON.stringify(event)}`);
    const { type } = event;

    switch (type) {
      case BotEventType.MessageReceived: {
        const { text, conversationUUID } = extractMessageData(event);
        const processedMessage = this.censorMessageText(text);

        return {
          initiator: Number(botClientId),
          type: 'SEND_MESSAGE',
          conversationUUID,
          payload: processedMessage,
        };
      }

      case BotEventType.MessageEdited:
      case BotEventType.MessageRemoved:
      case BotEventType.ErrorOccurred:
      case BotEventType.TaskDistributed:
      case BotEventType.TaskEnqueued:
      case BotEventType.TaskFinished:
      case BotEventType.Retransmitted:
      case BotEventType.ConversationEdited:
      case BotEventType.UNRECOGNIZED:
      default:
        this.logger.warn(`Skip unimplemented event type. Got type ${type} (${botEventTypeToJSON(type)})`);
    }
  }
}
