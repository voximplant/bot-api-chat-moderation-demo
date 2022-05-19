// @ts-ignore
import { MY_APP } from '@/config';
import { Module, ActionTree, GetterTree, MutationTree } from 'vuex';
import { storageService } from '@/services/storage.service';
import { voxService } from '@/services/vox.service';
import { AuthState, LoginForm } from '@/types/src/auth';
import { log, logError } from '@/utils';
import router from '@/router';

const Voximplant = voxService.get();

const ERROR_MESSAGES: Record<number, string> = {
  404: 'Invalid username or password',
  401: 'Invalid token',
  500: 'Internal sever error',
  701: 'Invalid token',
};

const initialState = () => {
  return {
    rememberData: true,
    accessToken: storageService.getAccessToken(),
    refreshToken: storageService.getRefreshToken(),
    loginName: storageService.getLogin(),
    authError: storageService.getError(),
  };
};

const state: AuthState = initialState();

const getters: GetterTree<AuthState, any> = {
  loginName: (state) => state.loginName,
  rememberData: (state) => state.rememberData,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken,
  authError: (state) => state.authError,
};

const actions: ActionTree<AuthState, any> = {
  login({ commit, state, dispatch }, loginForm: LoginForm) {
    if (loginForm.user !== state.loginName) {
      commit('clearInfo');
    }
    commit('updateRememberData', loginForm.rememberMe);

    // For login it's necessary to provide full name
    const fullLoginForm = Object.assign({}, loginForm);
    fullLoginForm.user = `${loginForm.user}@${MY_APP}.voximplant.com`;

    voxService
      .onLogin(fullLoginForm, state.accessToken)
      .then((data: any) => {
        dispatch('loginSuccess', { user: loginForm.user, tokens: data.tokens });
      })
      .catch((error: any) => {
        dispatch('onError', { error, loginForm });
      });
  },

  async adminLogin() {},

  async relogin({ state, dispatch }) {
    const fullLoginForm = {
      user: `${state.loginName}@${MY_APP}.voximplant.com`,
    };

    const { chatUuid } = router.currentRoute.params;
    if (chatUuid) storageService.setLastConversation(chatUuid);

    voxService
      .onLogin(fullLoginForm, state.accessToken)
      .then((data: any) => {
        dispatch('conversations/getInitialData', {}, { root: true }).then(
          () => {
            if (chatUuid) {
              dispatch('conversations/getCurrentConversation', chatUuid, {
                root: true,
              });
            }
          },
        );
        log('Re-logging in successfully!');
      })
      .catch((e: { code: number }) => {
        if (e.code === 701) dispatch('logout');
        logError(e);
      });
  },

  onError(
    { state, commit, dispatch }: any,
    errorData: { error: any; loginForm: LoginForm },
  ) {
    commit('updateAuthError', ERROR_MESSAGES[errorData.error.code]);

    if (errorData.error.code === 701) {
      return dispatch('tryRefreshTokens', errorData.loginForm);
    }

    if (errorData.error.code !== 404) {
      commit('updateLoginName', '');
      commit('clearInfo');
    }

    Voximplant.disconnect();
  },

  tryRefreshTokens({ commit, state, dispatch }, loginForm: LoginForm) {
    voxService
      .refreshTokens(loginForm.password, state.refreshToken)
      .then((response: any) => {
        dispatch('loginSuccess', {
          user: loginForm.user,
          tokens: response.tokens,
        });
      })
      .catch((error: any) => {
        dispatch('onError', { error, loginForm });
      });
  },

  async loginSuccess({ state, commit, dispatch }, data) {
    commit('updateTokens', data.tokens);
    commit('updateLoginName', data.user);
    commit('updateAuthError', '');
    state.rememberData
      ? storageService.setTokens(data.tokens, data.user)
      : storageService.removeTokens();

    await dispatch('conversations/getInitialData', {}, { root: true });
    const chatUuid = storageService.getLastConversation();
    if (chatUuid) {
      await router.push(`/chat/${chatUuid}`);
      await dispatch('conversations/getCurrentConversation', chatUuid, {
        root: true,
      });
    } else {
      await router.push('/');
    }
    log('Log in successfully!');
  },

  logout: ({ commit, dispatch }) => {
    Voximplant.disconnect();
    commit('clearInfo');
    router.push('/login');
    dispatch('clearStore');
  },

  clearStore: ({ commit }) => {
    commit('reset');
    commit('conversations/reset', {}, { root: true });
    commit('reset', {}, { root: true });
  },
};

const mutations: MutationTree<AuthState> = {
  clearInfo: (state) => {
    state.accessToken = '';
    state.refreshToken = '';
    state.loginName = '';
    storageService.removeTokens();
  },

  updateTokens: (state: any, newTokens) => {
    state.accessToken = newTokens.accessToken;
    state.refreshToken = newTokens.refreshToken;
  },

  updateLoginName: (state, newName) => {
    state.loginName = newName;
  },

  updateRememberData: (state, newRememberData) => {
    state.rememberData = newRememberData;
  },

  updateAuthError: (state, newError: number) => {
    if (!!newError) {
      // set new error into local storage && update state
      const errorMessage: string =
        ERROR_MESSAGES[newError] || 'Invalid username or password';
      logError('Login error', newError, errorMessage);
      storageService.setError(errorMessage);
      state.authError = errorMessage;
    } else {
      // delete previous error from local storage && update state
      storageService.removeError();
      state.authError = newError;
    }
  },
  reset: (state: any) => {
    // acquire initial state
    const s: any = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
};

export const auth: Module<any, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
