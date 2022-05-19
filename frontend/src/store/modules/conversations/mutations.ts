import Vue from 'vue';
import {
  ConversationsState,
  Participant,
  Message,
} from '@/types/src/conversations';
import { initialState } from '@/store/modules/conversations/getters';
import { MutationTree } from 'vuex';

const mutationsConversations: MutationTree<ConversationsState> = {
  updateCurrentUser(state, newData) {
    state.currentUser = newData;
  },

  updateUsers(state, newData) {
    state.users = state.users.concat(newData);
  },

  updateConversations(state, newData) {
    newData.forEach((c: any) => {
      if (c.direct) {
        const participant = c.participants.find(
          (p: Participant) => p.userId !== state.currentUser.userId,
        );
        c.directUserId = participant.userId;
      }
    });

    state.conversations = newData;
  },

  updateConversation(state, newConversation) {
    state.conversations[
      state.conversations.findIndex((c: any) => c.uuid === newConversation.uuid)
    ] = newConversation;
  },

  updateCurrentConversationId(state, newId) {
    state.currentConversationId = newId;
  },

  setMessagesToConversation(state, messages) {
    if (messages.length > 0) {
      const conversationID = messages[0].conversation;
      state.conversationsHistory = {
        ...state.conversationsHistory,
        [conversationID]: messages,
      };
    }
  },

  addMessagesInConversation(state, message) {
    const conversationID = message.conversation;
    state.conversationsHistory = {
      ...state.conversationsHistory,
      [conversationID]: [
        ...(state.conversationsHistory[conversationID] || []),
        message,
      ],
    };
  },

  editMessagesInConversation(state, message) {
    const conversationID = message.conversation;
    const history = state.conversationsHistory[conversationID];
    if (!history) return;

    const messageIndexToEdit = history.findIndex(
      (historyMessage: Message) =>
        message.messageUUID === historyMessage.uuid ||
        message.uuid === historyMessage.uuid,
    );

    if (messageIndexToEdit >= 0) {
      history[messageIndexToEdit] = message;
    } else {
      history.push(message);
    }

    state.conversationsHistory = {
      ...state.conversationsHistory,
      [conversationID]: [...history],
    };
  },

  deleteMessageFromConversation(state, message) {
    const messages = state.conversationsHistory[message.conversation];
    messages.splice(
      messages.findIndex((m: any) => m.uuid === message.uuid),
      1,
    );
  },

  addTyping(state, userName: string) {
    Vue.set(state.typingUsers, state.typingUsers.length, userName);
  },

  deleteTyping(state, userName: string) {
    const index = state.typingUsers.indexOf(userName);
    state.typingUsers.splice(index, 1);
  },

  addOnline(state, userId: number) {
    Vue.set(state.onlineUsers, state.onlineUsers.length, userId);
  },

  deleteOnline(state, userId: number) {
    // @ts-ignore
    const index = state.onlineUsers.indexOf(userId);
    state.onlineUsers.splice(index, 1);
  },

  updateLastEvent(state, lastEvent: number) {
    const index = state.conversations.findIndex(
      (c: any) => c.uuid === state.currentConversationId,
    );
    // @ts-ignore
    state.conversations[index].lastEvent = lastEvent;
  },

  reset: (state) => {
    // acquire initial state
    const s: any = initialState();
    Object.keys(s).forEach((key) => {
      // @ts-ignore
      state[key] = s[key];
    });
  },
};

export default mutationsConversations;
