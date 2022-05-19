import * as jwt from 'jsonwebtoken';
import { botClientId, botKeyId, botPrivateKey } from '../../lib/config';
import { SQBotEvent } from '../../types/bot';
import { MessageReceivedEvent } from '../../types/structs';

/*
 * Issue a JWT to access a bot
 * The main parameters – botClientId, botKeyId - are gotten when creating a bot with an HTTP-request
 * It is required to set at least:
 *  header:
 *  - kid
 *  - alg
 *  body:
 *  - iss
 *  - iat
 *
 * The JWT is signed with a private key obtained when creating the bot
 */
export const issueBotApiJwt = (params: { botClientId: string; botKeyId: string; botPrivateKey: string }) => {
  const { botKeyId, botPrivateKey } = params;
  const options = {
    keyid: botKeyId,
    header: { typ: 'JWT', alg: 'RS256' },
  };

  const currentUnixTimeSecs = Math.floor(Date.now() / 1000);
  const payload = {
    iss: botKeyId,
    iat: currentUnixTimeSecs,
  };
  return jwt.sign(JSON.stringify(payload), botPrivateKey, options);
};

export const botJwt = issueBotApiJwt({
  botKeyId,
  botPrivateKey,
  botClientId,
});

export interface MessageData {
  text?: string;
  initiator?: number;
  conversationUUID?: string;
  messageUUID?: string;
}

/*
 * Utility to retrieve data from the received messages
 */
export const extractMessageData = (message: SQBotEvent): MessageData => {
  const messageEvent = message.messageReceivedEvent ?? message.messageRemovedEvent ?? message.messageEditedEvent;

  return {
    text: (messageEvent as MessageReceivedEvent)?.message.text,
    initiator: messageEvent?.initiator,
    conversationUUID: (messageEvent as MessageReceivedEvent)?.message?.conversationUUID,
    messageUUID: (messageEvent as MessageReceivedEvent)?.message?.messageUUID,
  };
};
