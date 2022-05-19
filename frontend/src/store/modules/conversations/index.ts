import { state, getters } from './getters';
import mutations from './mutations';
import actions from './actions';
import { Module } from 'vuex';

export let conversations: Module<any, any>;

conversations =  {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
