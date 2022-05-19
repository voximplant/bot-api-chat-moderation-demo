import { ActionContext, ActionTree } from 'vuex';
import {
  ConversationsState,
  Participant,
  User,
} from '@/types/src/conversations';
import { logError, logHelp } from '@/utils';
import MessengerService from '@/services/messenger.service';
import { MessageEvents } from '@/types/src/events';

const extractDataFromText = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

const onSendMessageEvent = (
  context: ActionContext<ConversationsState, any>,
  events: MessageEvents,
) => {
  events.message.timestamp = events.timestamp;
  events.message.seq = events.seq;

  if (events.message.sender === context.state.currentUser.userId) {
    events.message.user = context.state.currentUser;
  } else {
    const payload = extractDataFromText(events.message.text);
    const messageSenderUserId = payload
      ? payload.userId
      : events.message.sender;

    events.message.user = context.state.users.find(
      (c: User) => c.userId === Number(messageSenderUserId),
    );
  }

  const message = events.message;
  const data = extractDataFromText(events.message.text);
  if (data && data.type === 'SEND_NOTIFICATION') return;

  if (data) {
    message.text = data.text;
    message.type = data.type;
    message.userId = data.userId;
  }

  context.commit('addMessagesInConversation', message);
};

const parseEditMessage = (
  events: MessageEvents,
  currentUser: User,
  users: User[],
) => {
  events.message.timestamp = events.timestamp;
  events.message.seq = events.seq;

  const message = events.message;
  const messageData = JSON.parse(message.text);

  const sender = Number(messageData.originalMessage.initiator);
  if (sender === currentUser.userId) {
    message.user = currentUser;
  } else {
    message.user = users.find((c: User) => c.userId === sender);
  }

  return {
    user: message.user,
    payload: message.payload,
    sender: message.sender,
    text: messageData.newText,
    uuid: messageData.originalMessage.message.messageUUID,
    conversation: messageData.originalMessage.message.conversationUUID,
    seq: message.seq,
    timestamp: message.timestamp,
  };
};

const onEditMessageEvent = (
  context: ActionContext<ConversationsState, any>,
  events: MessageEvents,
) => {
  try {
    const newMessage = parseEditMessage(
      events,
      context.state.currentUser,
      context.state.users,
    );
    context.commit('editMessagesInConversation', newMessage);
  } catch (e) {
    console.error(e);
  }
};

const actionsMessages: ActionTree<ConversationsState, any> = {
  getConversationHistory: async (context) => {
    const lastEvent =
      context.getters.currentConversationHistory &&
      context.getters.currentConversationHistory.length
        ? context.getters.currentConversation.lastEvent
        : context.getters.currentConversation.lastSeq;

    if (lastEvent !== 0) {
      await MessengerService.get()
        .retransmitMessageEvents(context.getters.currentConversation, lastEvent)
        .then((messageEvents: MessageEvents[]) => {
          messageEvents.forEach((event) => {
            switch (event.messengerAction) {
              case 'editMessage':
                onEditMessageEvent(context, event);
                break;
              case 'sendMessage':
                onSendMessageEvent(context, event);

                break;
              default:
                logHelp(
                  `Unknown message ${
                    event.messengerAction
                  }. Original event ${JSON.stringify(messageEvents)}`,
                );
            }
          });
        });
    }
  },

  sendNewMessage: ({ getters }, text) => {
    MessengerService.get()
      .sendMessage(getters.currentConversation, text)
      .catch(logError);
  },

  /**
   * Resolvers for MessengerService listeners
   */

  onMessageSent: (context, e) => {
    e.message.timestamp = e.timestamp;
    e.message.seq = e.seq;
    if (e.message.sender === context.state.currentUser.userId) {
      e.message.user = context.state.currentUser;
    } else {
      e.message.user = context.state.users.find(
        (c: User) => c.userId === e.message.sender,
      );
    }

    const message = e.message;
    const data = extractDataFromText(e.message.text);
    if (data) {
      message.text = data.text;
      message.type = data.type;
      message.userId = data.userId;
    }
    context.commit('addMessagesInConversation', message);
    context.commit('SCROLLING_START', false, { root: true });
  },

  onMessageEdited: (context, event) => {
    const newMessage = parseEditMessage(
      event,
      context.state.currentUser,
      context.state.users,
    );

    context.commit('editMessagesInConversation', newMessage);
  },
};

export default actionsMessages;
