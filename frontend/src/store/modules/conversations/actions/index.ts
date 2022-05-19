import { ActionTree } from 'vuex';
import { logError } from '@/utils';

import { ConversationsState, InitialData } from '@/types/src/conversations';
import { UserEvents } from '@/types/src/events';

import actionsMessages from '@/store/modules/conversations/actions/actionsMessages';
import actionsConversations from '@/store/modules/conversations/actions/actionsConversations';

import MessengerService from '@/services/messenger.service';
import { TIME_ONLINE_NOTIFICATION } from '@/config';

const actions: ActionTree<ConversationsState, any> = {
  getInitialData: ({ commit }) => {
    return new Promise((resolve, reject) =>
      MessengerService.get().init()
        .then((data: InitialData) => {
          // Get the current user data
          commit('updateCurrentUser', data.currentUser);
          commit('updateUsers', data.users);
          commit('updateConversations', data.conversations);

          resolve(data);
        })
        .catch((error: any) => {
          logError('Getting initial data is failed', error);
          reject(error);
        }),
    );
  },

  editUser: (context, customData: { image: string, status: string }) => {
    MessengerService.get().editUserCustomData(customData).then((evt: UserEvents) => {
      context.commit('updateCurrentUser', evt.user);
    }).catch(logError);
  },

  onOnlineReceived: ({ state, commit }, e: UserEvents) => {
    if (e.initiator !== state.currentUser.userId) {
      commit('addOnline', e.initiator);
      setTimeout(() => commit('deleteOnline', e.initiator), TIME_ONLINE_NOTIFICATION);
    }
  },
  ...actionsMessages,
  ...actionsConversations,
};

export default actions;
