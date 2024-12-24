import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  error: any | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,

  // Login Actions
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error,
  })),

  // Signup Actions
  on(AuthActions.signup, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.signupSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Logout Action
  on(AuthActions.logout, () => ({
    ...initialState, // Reset state on logout
  }))
);
