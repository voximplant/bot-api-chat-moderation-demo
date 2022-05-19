import { logHelp } from '@/utils';

const initialState = () => {
  return {
    loading: true,
    scrollToEnd: false,
  };
};

export default {
  state: initialState(),
  getters: {
    loading: (state: { loading: boolean }) => state.loading,
    scrollToEnd: (state: { scrollToEnd: boolean }) => state.scrollToEnd,
  },
  actions: {},
  mutations: {
    LOADING_START(state: { loading: boolean }) {
      state.loading = true;
    },

    LOADING_STOP(state: { loading: boolean }) {
      state.loading = false;
    },

    SCROLLING_START(state: { scrollToEnd: boolean }) {
      state.scrollToEnd = true;
    },

    SCROLLING_STOP(state: { scrollToEnd: boolean }) {
      state.scrollToEnd = false;
    },

    reset: (state: any) => {
      // acquire initial state
      const s: any = initialState();
      Object.keys(s).forEach((key) => {
        state[key] = s[key];
      });
    },
  },
};
