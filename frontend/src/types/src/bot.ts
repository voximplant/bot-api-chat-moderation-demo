import { storageService } from '@/services/storage.service';
import { User } from '@/types';

export type BlockList = string[];

export interface GetBlockListResponse {
  blockList: BlockList;
}

export interface PairedConversation {
  userId: number;
  conversationUUID: string;
}

export type PairedConversations = PairedConversation[];

export interface ConversationLog {
  createdAt: string;
  userId: number;
  blockedContent: string;
  conversationUUID: string;
  originalText: string;
}

export interface BotStoreState {
  adminBasicToken: string;
  blockList: BlockList;
  conversations: PairedConversations[];
  logs: ConversationLog[];
  users: User[];
}
