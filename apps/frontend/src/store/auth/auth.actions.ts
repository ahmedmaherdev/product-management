import { createAction, props } from '@ngrx/store';

// Login Actions
export const login = createAction('[Auth] Login', props<{ credentials: { email: string; password: string } }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string; user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

// Signup Actions
export const signup = createAction('[Auth] Signup', props<{ data: { email: string; password: string; confirmPassword: string; name: string } }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ token: string; user: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

// Logout Action
export const logout = createAction('[Auth] Logout');
