import { log, logError } from '@/utils';
import * as VoxImplant from 'voximplant-websdk';
import store from '@/store/store';

class VoxService {
  private static inst: any;

  constructor() {
    // Create Voximplant Web SDK instance
    VoxService.inst = VoxImplant.getInstance();

    // Reconnect to the Voximplant cloud when disconnected
    VoxService.inst.on(VoxImplant.Events.ConnectionClosed, () => {
      log('Connection was closed');
      this.connectToVoxCloud();
    });

    // Init Voximplant
    VoxService.inst
      .init({
        experiments: {
          messagingV2: true,
        },
      })
      .then(() => {
        log('SDK initialized');
        // Connect to the Voximplant cloud
        this.connectToVoxCloud();
      })
      .catch(logError);
  }

  public get() {
    if (!VoxService.inst) {
      VoxService.inst = VoxImplant.getInstance();
    }
    return VoxService.inst;
  }

  /**
   * Sign in the Voximplant cloud
   * return Promise with new tokens
   * @param loginForm data from new filled login form
   * @param accessToken previously saved token
   */
  public onLogin(loginForm: any, accessToken: string) {
    if (!accessToken) {
      return VoxService.inst.login(loginForm.user, loginForm.password);
    } else {
      return VoxService.inst.loginWithToken(loginForm.user, accessToken);
    }
  }

  public refreshTokens(password: string, refreshToken: string) {
    return VoxService.inst.tokenRefresh(password, refreshToken);
  }

  /**
   * Re-login with tokens if connection breaks
   */
  private connectToVoxCloud() {
    VoxService.inst
      .connect(false)
      .then(() => {
        log('Connection was established successfully');
        store.dispatch('auth/relogin');
      })
      .catch(() => {
        logError('Connection failed');
      });
  }
}

export const voxService = new VoxService();
