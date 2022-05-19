//Store
export interface AuthState {
  rememberData: boolean;
  accessToken: string;
  refreshToken: string;
  loginName: string;
  authError: string | number;
}

export interface LoginForm {
  user: string;
  password: string;
  rememberMe: boolean;
}
