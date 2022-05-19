import {
  ConversationsState,
  Participant,
  Conversation,
  User,
} from '@/types/src/conversations';
import { GetterTree } from 'vuex';

export const initialState: any = () => {
  return {
    currentUser: {},
    // @ts-ignore
    conversations: [],
    conversationsHistory: {},
    // @ts-ignore
    users: [],
    // @ts-ignore
    currentConversationId: null,
    // @ts-ignore
    typingUsers: [],
    // @ts-ignore
    onlineUsers: [],
  };
};

const state: ConversationsState = initialState();

const getters: GetterTree<ConversationsState, any> = {
  currentConversationId: (state) => state.currentConversationId,

  currentConversation: (state) => {
    return state.conversations.find(
      (c: Conversation) => c.uuid === state.currentConversationId,
    );
  },
  // @ts-ignore
  currentConversationUsers: (state, getters) => {
    if (getters.currentConversation) {
      return state.users.filter(
        (u: User) =>
          !!getters.currentConversation.participants.find(
            (p: Participant) => Number(p.userId) === Number(u.userId),
          ),
      );
    }
  },

  currentConversationHistory: (state) => {
    return state.conversationsHistory[state.currentConversationId];
  },
  // @ts-ignore
  currentConversationMyPermissions: (state) => {
    if (state.currentConversationId) {
      return state.conversations
        .find((c: Conversation) => c.uuid === state.currentConversationId)
        .participants.find(
          (user: Participant) => user.userId === state.currentUser.userId,
        );
    }
  },

  // Return permissions first not admin user
  currentConversationPermissions: (state, getters) => {
    if (getters.currentConversation) {
      return getters.currentConversation.customData.permissions
        ? getters.currentConversation.customData.permissions
        : getters.currentConversation.participants.find(
            (user: Participant) =>
              user.userId !== state.currentUser.userId && !user.isOwner,
          );
    }
  },
  // @ts-ignore
  currentConversationAdmins: (state, getters) => {
    if (getters.currentConversation) {
      return state.users.filter((u: User) =>
        getters.currentConversation.participants.find(
          (p: Participant) => p.isOwner && u.userId === p.userId,
        ),
      );
    }
  },

  possibleChatAdmins: (state, getters) => {
    if (getters.currentConversation) {
      return getters.currentConversationUsers.filter(
        (u: User) =>
          !getters.currentConversationAdmins.find(
            (a: any) => a.userId === u.userId,
          ),
      );
    }
  },
  // @ts-ignore
  currentDirectUser: (state, getters) => {
    if (getters.currentConversation && getters.currentConversation.direct) {
      return state.users.find(
        (u: User) => u.userId === getters.currentConversation.directUserId,
      );
    }
  },

  currentDirectConversations: (state) =>
    state.conversations.filter((c: Conversation) => c.direct),

  currentDirectUsersId: (state, getters) =>
    getters.currentDirectConversations.reduce(
      (res: number[], d: Conversation) => {
        d.participants.forEach((u) => {
          if (u.userId !== state.currentUser.userId) {
            res.push(u.userId);
          }
        });

        return res;
      },
      [],
    ),

  possibleDirectUsers: (state, getters) => {
    return state.users.filter(
      (u: User) =>
        !getters.currentDirectUsersId.find(
          (userId: number) => userId === u.userId,
        ),
    );
  },
  // @ts-ignore
  possibleChatUsers: (state, getters) => {
    if (getters.currentConversation) {
      return state.users.filter(
        (u: User) =>
          !getters.currentConversationUsers.find(
            (p: any) => p.userId === u.userId,
          ),
      );
    }
  },

  currentTypingUsers: (state) => state.typingUsers,
  currentOnlineUsers: (state) => state.onlineUsers,
};

export { state, getters };
