import { forgotPassword, login, signUp } from './actions';

export type AuthActionReturn =
  | ReturnType<typeof login>
  | ReturnType<typeof signUp>
  | ReturnType<typeof forgotPassword>;

export const AuthFormActions = {
  login,
  signUp,
  forgotPassword,
};
