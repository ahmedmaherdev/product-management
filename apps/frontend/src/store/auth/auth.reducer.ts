import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  error: any | null;
  forgotPasswordMessage: string | null;
  resetPasswordMessage: string | null;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null,
  forgotPasswordMessage: null,
  resetPasswordMessage: null,
};

export const authReducer = createReducer(
  initialState,

  // Login Actions
  on(AuthActions.login, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false,
    error,
  })),

  // Signup Actions
  on(AuthActions.signup, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.signupSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Forgot Password Actions
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    forgotPasswordMessage: null,
    error: null,
  })),
  on(AuthActions.forgotPasswordSuccess, (state, { message }) => ({
    ...state,
    forgotPasswordMessage: message,
    error: null,
  })),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Reset Password Actions
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    resetPasswordMessage: null,
    error: null,
  })),
  on(AuthActions.resetPasswordSuccess, (state, { message }) => ({
    ...state,
    resetPasswordMessage: message,
    error: null,
  })),
  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Logout Action
  on(AuthActions.logout, () => ({
    ...initialState, // Reset state on logout
  }))
);
