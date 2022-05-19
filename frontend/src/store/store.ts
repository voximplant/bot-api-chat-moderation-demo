import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { conversations } from '@/store/modules/conversations';
import { botStore } from '@/store/modules/bot';
import global from '@/store/global';

Vue.use(Vuex);

export default new Vuex.Store({
  ...global,

  modules: {
    auth,
    conversations,
    botStore,
  },
});
