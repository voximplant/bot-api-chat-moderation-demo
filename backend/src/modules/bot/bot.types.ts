export interface CensorMessageTextResponse {
  censoredText: string;
  meta: {
    originalText: string;
    censoredWords: string[];
  };
}

export interface ProcessBotEventResult {
  type: NextCommand;
  conversationUUID: string;
  initiator: number;
  payload: CensorMessageTextResponse;
}

export type NextCommand = 'SEND_MESSAGE';

export type UUID = string;
export interface ConversationPair {
  pairId: number;
  owner: number;
  conversationUUID: UUID;
  linkedConversation: {
    conversationUUID: UUID;
    owner: number;
  };
}

export type ConversationPairMap = Record<UUID, ConversationPair>;
export type ISODateTime = string;

export interface CensorLog {
  createdAt: ISODateTime;
  userId: number;
  blockedContent: string;
  originalText: string;
  conversationUUID: UUID;
}

export type MessageTypes = 'SEND_MESSAGE' | 'SEND_NOTIFICATION' | 'EDIT_MESSAGE';
