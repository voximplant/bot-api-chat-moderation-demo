import { log } from '@/utils';

const TOKEN_KEY = 'vox_token_a';
const ADMIN_BASIC_TOKEN_KEY = 'vox_admin_basic_token';
const REFRESH_TOKEN_KEY = 'vox_token_r';
const LOGIN = 'vox_login';
const ERROR = 'vox_error';
const VOXCHAT_LAST_CONVERSATION_UUID = 'voxchat_last_conversation_uuid';

/**
 * Manage the how Access Tokens are being stored and retrieved from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/

class StorageService {
  public getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getAdminBasicToken() {
    return localStorage.getItem(ADMIN_BASIC_TOKEN_KEY);
  }

  public getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public getLogin(): any {
    return localStorage.getItem(LOGIN);
  }

  public getError(): any {
    return localStorage.getItem(ERROR);
  }

  public getLastConversation(): any {
    return localStorage.getItem(VOXCHAT_LAST_CONVERSATION_UUID);
  }

  public setError(error: string): any {
    return localStorage.setItem(ERROR, error);
  }

  public removeError(): any {
    return localStorage.removeItem(ERROR);
  }

  public setTokens(
    authToken: { accessToken: string; refreshToken: string },
    login = '',
  ) {
    localStorage.setItem(TOKEN_KEY, authToken.accessToken);
    localStorage.setItem(LOGIN, login);
    localStorage.setItem(REFRESH_TOKEN_KEY, authToken.refreshToken);
  }

  public setAdminToken(adminBasicToken = '') {
    localStorage.setItem(ADMIN_BASIC_TOKEN_KEY, adminBasicToken);
  }

  public removeTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(LOGIN);
    localStorage.removeItem(ADMIN_BASIC_TOKEN_KEY);
  }

  public setLastConversation(uuid: string): any {
    return localStorage.setItem(VOXCHAT_LAST_CONVERSATION_UUID, uuid);
  }
}

export const storageService = new StorageService();
