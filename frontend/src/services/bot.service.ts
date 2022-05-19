import { URL_BOT_BACKEND, URL_NEW_USERS } from '@/config';
import {
  BlockList,
  ConversationLog,
  PairedConversations,
} from '@/types/src/bot';
import { logError } from '@/utils';
import { storageService } from '@/services/storage.service';
import { User } from '@/types';

export default class BotService {
  private static inst: any;
  token = '';

  public static get(): BotService {
    if (!BotService.inst) {
      const token = storageService.getAdminBasicToken();
      BotService.inst = new BotService(token);
    }
    return BotService.inst;
  }

  constructor(token = '') {
    this.token = token;
  }

  /*
   * Main URLs to interact with the backend
   *
   * `/auth` - check the authorization token of the admin panel
   * `/bot/block-list` - get and edit the demo blocklist
   * `/bot/conversations` - get available chat rooms
   * `/bot/conversation-logs` - get moderated messages
   */
  private apiUrls = {
    auth: `${URL_BOT_BACKEND}/auth`,
    blockList: `${URL_BOT_BACKEND}/bot/block-list`,
    conversations: `${URL_BOT_BACKEND}/bot/conversations`,
    conversationLogs: `${URL_BOT_BACKEND}/bot/conversation-logs`,
  };

  /*
   * For authentication, you can just check the correctness of the authentication token, 
   * because there is only one administrator in the demo
   */
  public async checkBasicToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(this.apiUrls.auth, {
        headers: {
          authorization: `Basic ${token}`,
        },
      });

      if (response.status === 200) {
        const { isValid } = await response.json();
        return isValid;
      }

      return false;
    } catch (e) {
      logError(e);
      return false;
    }
  }

  /*
   * Get the blocklist as an array of words
   */
  public async getBlockList(): Promise<BlockList> {
    const response = await fetch(this.apiUrls.blockList, {
      headers: {
        Authorization: `Basic ${this.token}`,
      },
    });
    const { blockList } = await response.json();
    return blockList;
  }

  /*
   * Edit the blocklist
   */
  public async updateBlockList(blockList: BlockList): Promise<BlockList> {
    const requestBody = JSON.stringify({
      blockList,
    });

    const response = await fetch(this.apiUrls.blockList, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.token}`,
      },
      body: requestBody,
    });
    const { blockList: savedBlockList } = await response.json();
    return savedBlockList;
  }

  /*
   * Get the chat room list
   */
  public async getConversations(): Promise<PairedConversations[]> {
    const response = await fetch(this.apiUrls.conversations, {
      headers: {
        Authorization: `Basic ${this.token}`,
      },
    });
    const { conversations } = await response.json();
    return conversations;
  }

  /*
   * Get the moderated messages
   */
  public async getConversationLogs(): Promise<ConversationLog[]> {
    const response = await fetch(this.apiUrls.conversationLogs, {
      headers: {
        Authorization: `Basic ${this.token}`,
      },
    });
    const { logs } = await response.json();
    return logs;
  }

  public async getUsers(): Promise<User[]> {
    const response = await fetch(URL_NEW_USERS, {
      headers: {
        Authorization: `Basic ${this.token}`,
      },
    });

    if (!response.ok) {
      logError('Failed to fetch users for admin dashboard');
      return [];
    }

    const users = await response.json();
    return users;
  }
}
