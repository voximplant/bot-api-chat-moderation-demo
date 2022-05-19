import { botGetters, botState } from './getters';
import { botMutations } from './mutations';
import { botActions } from './actions';
import { Module } from 'vuex';
import { BotStoreState } from '@/types/src/bot';

export const botStore: Module<BotStoreState, any> = {
  namespaced: true,
  state: botState,
  getters: botGetters,
  mutations: botMutations,
  actions: botActions,
};
