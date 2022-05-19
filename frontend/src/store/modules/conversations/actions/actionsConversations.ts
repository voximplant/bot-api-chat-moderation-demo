import { ActionTree } from 'vuex';
import {
  Conversation,
  ConversationsState,
  User,
} from '@/types/src/conversations';
import router from '@/router';
import MessengerService from '@/services/messenger.service';
import { log, logError, logHelp } from '@/utils';

const TYPE_CONVERSATION = {
  direct: 'direct',
  chat: 'chat',
  channel: 'channel',
};

const actionsConversations: ActionTree<ConversationsState, any> = {
  getDirectConversation: (context, userId: number) => {
    if (context.getters.currentDirectUsersId.includes(userId)) {
      const index = context.getters.currentDirectUsersId.indexOf(userId);
      const chatUuid = context.getters.currentDirectConversations[index].uuid;
      context.commit('updateCurrentConversationId', chatUuid);

      router.push({
        name: 'current-chat',
        params: { chatUuid: context.getters.currentConversation.uuid },
      });

      context.commit('SCROLLING_START', false, { root: true });
    } else {
      MessengerService.get().createDirect(userId).catch(logError);
    }
  },

  getCurrentConversation: (context: any, chatUuid: number | string) => {
    if (chatUuid === context.state.currentConversationId) {
      context.commit('SCROLLING_START', false, { root: true });
      return null;
    } else if (typeof chatUuid === 'string') {
      context.commit('updateCurrentConversationId', chatUuid);

      router.push({
        name: 'current-chat',
        params: { chatUuid: context.getters.currentConversation.uuid },
      });

      context.commit('SCROLLING_START', false, { root: true });

      if (
        !context.getters.currentConversationHistory &&
        context.getters.currentConversation
      ) {
        context.commit('LOADING_START', true, { root: true });
        context.dispatch('getConversationHistory').then(() => {
          context.commit('LOADING_STOP', false, { root: true });
          context.commit('SCROLLING_START', false, { root: true });
        });
      }
    } else if (typeof chatUuid === 'number') {
      context.dispatch('getDirectConversation', chatUuid);
    }
  },

  onConversationCreated: ({ state, commit }, e: any) => {
    log('Conversation created', e);

    // Update conversation list
    if (e.conversation.customData.type === 'direct') {
      const participant = e.conversation.participants.find(
        (p: any) => p.userId !== state.currentUser.userId,
      );
      e.conversation.directUserId = participant.userId;
    }

    // @ts-ignore
    state.conversations.push(e.conversation);

    // Set the conversation as a current if it is created by this user
    if (e.initiator === state.currentUser.userId) {
      commit('updateCurrentConversationId', e.conversation.uuid);
      router.push({
        name: 'current-chat',
        params: { chatUuid: e.conversation.uuid },
      });
    } else {
      // Get participants user data if there are new
      const newUsers = e.conversation.participants.filter(
        (p: User) => !state.users.some((u: User) => u.userId === p.userId),
      );

      if (newUsers.length) {
        const usersIds = newUsers.map((u: User) => u.userId);
        MessengerService.messenger
          .getUsersById(usersIds)
          .then((events: any) => {
            commit(
              'updateUsers',
              events.map((e: any) => e.user),
            );
          })
          .catch(logError);
      }
    }

    // Get participant ids excluding the current user
    const otherParticipantIds = e.conversation.participants
      .map((p: User) => p.userId)
      .filter((id: number) => id !== state.currentUser.userId);
    // Subscribe to other participant events (info and presence status change)
    if (otherParticipantIds.length) {
      MessengerService.messenger
        .subscribe(otherParticipantIds)
        .then((e: any) => {
          log('Subscribed to conversation participants', e);
        })
        .catch(logError);
    }
  },

  createConversation: ({ state, dispatch }, newChat) => {
    try {
      if (newChat.type === TYPE_CONVERSATION.chat) {
        return MessengerService.get().createChat(newChat);
      } else if (newChat.type === TYPE_CONVERSATION.channel) {
        return MessengerService.get().createChannel(newChat);
      } else if (newChat.type === TYPE_CONVERSATION.direct) {
        return MessengerService.get().createDirect(newChat.usersId);
      } else {
        logError(`Conversation type ${newChat.type} is unknown`);
      }
    } catch (e) {
      logError(e);
    }
  },

  editConversation: ({ getters }, newData) => {
    if (newData.title && newData.title !== getters.currentConversation.title) {
      getters.currentConversation.setTitle(newData.title).catch(logError);
    }

    if (newData.customData) {
      getters.currentConversation
        .setCustomData({
          ...getters.currentConversation.customData,
          ...newData.customData,
        })
        .catch(logError);
    }
  },

  onConversationEdited: ({ state, commit }, e: any) => {
    // If the current user was added to the conversation
    if (
      !state.conversations.some(
        (c: Conversation) => c.uuid === e.conversation.uuid,
      )
    ) {
      log('Joined conversation', e);

      // @ts-ignore
      state.conversations.push(e.conversation);
      // If the current user has left the conversation
    } else if (
      !e.conversation.participants.some(
        (p: User) => p.userId === state.currentUser.userId,
      )
    ) {
      log(`Left conversation ${e.conversation.title}`, e);

      // Update conversation list
      state.conversations = state.conversations.filter(
        (c: any) => c.uuid !== e.conversation.uuid,
      );

      if (e.conversation.uuid === state.currentConversationId) {
        commit('updateCurrentConversationId', null);
      }
    } else {
      log('Conversation edited', e);

      // @ts-ignore
      state.conversations = state.conversations.map((c) => {
        if (c.uuid === e.conversation.uuid) {
          return e.conversation;
        } else {
          return c;
        }
      });
    }
  },

  leaveCurrentConversation: ({ state }) => {
    if (state.currentConversationId) {
      MessengerService.get().leaveConversation(state.currentConversationId);
    }
  },

  addNewParticipants: (context, userIds) => {
    MessengerService.get()
      .addParticipants(context.getters.currentConversation, userIds)
      .then((evt: any) => {
        logHelp('New members were added', evt);
        context.commit('updateConversation', evt.conversation);
      })
      .catch(logError);
  },

  deleteParticipants: (context, userIds) => {
    MessengerService.get()
      .removeParticipants(context.getters.currentConversation, userIds)
      .then((evt: any) => {
        logHelp('Some members were removed', evt);
        context.commit('updateConversation', evt.conversation);
      })
      .catch(logError);
  },

  addNewAdmins: (context, userIds) => {
    MessengerService.get()
      .addAdmins(context.getters.currentConversation, userIds)
      .then((evt: any) => {
        logHelp('New admins were added', evt);
        context.commit('updateConversation', evt.conversation);
      })
      .catch(logError);
  },

  editChatPermissions: (context, permissions) => {
    const allUsersIds = context.getters.possibleChatAdmins.map(
      (u: User) => u.userId,
    );
    MessengerService.get()
      .editPermissions(
        context.getters.currentConversation,
        permissions,
        allUsersIds,
      )
      .then((evt: any) => {
        logHelp('Chat permissions were edited', evt);
        context.commit('updateConversation', evt.conversation);
      })
      .catch(logError);
  },

  notifyTyping: ({ getters }) => {
    MessengerService.get()
      .notifyTyping(getters.currentConversation)
      .catch(logError);
  },

  onNotifyTyping: (context, evt) => {
    if (
      evt.initiator !== context.state.currentUser.userId &&
      evt.conversation === context.state.currentConversationId
    ) {
      logHelp('another user typing event', evt);

      const userName = context.state.users.find(
        (u: User) => u.userId === evt.initiator,
      ).displayName;
      context.commit('addTyping', userName);
      setTimeout(() => context.commit('deleteTyping', userName), 9000);
    }
  },
};

export default actionsConversations;
