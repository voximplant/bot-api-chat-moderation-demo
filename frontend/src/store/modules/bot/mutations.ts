import { MutationTree } from 'vuex';
import { BotStoreState } from '@/types/src/bot';

export const botMutations: MutationTree<BotStoreState> = {
  setBlockList(state, { blockList }) {
    state.blockList = blockList;
  },

  setPairedConversations(state, { conversations }) {
    state.conversations = conversations;
  },

  setConversationLogs(state, { logs }) {
    state.logs = logs;
  },

  setAdminBasicToken(state, { token }) {
    state.adminBasicToken = token;
  },

  setUsers(state, { users }) {
    state.users = users;
  },
};
