import { ActionTree } from 'vuex';
import { BotStoreState } from '@/types/src/bot';
import BotService from '@/services/bot.service';
import { logError, logHelp } from '@/utils';
import { storageService } from '@/services/storage.service';
import router from '@/router';

export const botActions: ActionTree<BotStoreState, any> = {
  checkBasicAuthToken: async (context, payload: { token: string }) => {
    const { token } = payload;
    const isValid = await BotService.get().checkBasicToken(token);
    const { commit } = context;

    if (isValid) {
      storageService.setAdminToken(token);
      commit('setAdminBasicToken', { token });
      BotService.get().token = token;
      if (router.currentRoute.name !== 'admin')
        await router.push({ name: 'admin' });
    }

    return isValid;
  },

  onAuthAdminDashboard: async (context, payload: { token: string }) => {
    const { commit, dispatch } = context;
    const { token } = payload;

    const isValid = await dispatch('checkBasicAuthToken', { token });
    if (!isValid) {
      commit('auth/updateAuthError', 404, { root: true });
    } else {
      commit('auth/updateAuthError', null, { root: true });
    }
  },

  getBlockList: async (context) => {
    try {
      const blockList = await BotService.get().getBlockList();
      logHelp('Got block list: ', blockList);
      const { commit } = context;
      commit('setBlockList', { blockList });
    } catch (e) {
      logError(e);
    }
  },

  updateBlockList: async (context, { blockList }) => {
    try {
      const uniqueBlockList = Array.from(new Set<string>(blockList));

      const savedBlockList = await BotService.get().updateBlockList(
        uniqueBlockList,
      );
      logHelp('Saved block list: ', savedBlockList);
      context.commit('setBlockList', { blockList: savedBlockList });
    } catch (e) {
      logError(e);
    }
  },

  getConversations: async (context) => {
    try {
      const conversations = await BotService.get().getConversations();
      const { commit } = context;
      commit('setPairedConversations', { conversations });
    } catch (e) {
      logError(e);
    }
  },

  getConversationLogs: async (context) => {
    const logs = await BotService.get().getConversationLogs();
    const { commit } = context;
    commit('setConversationLogs', { logs });
  },

  getUsers: async (context) => {
    const users = await BotService.get().getUsers();
    const { commit } = context;
    commit('setUsers', { users });
  },
};
