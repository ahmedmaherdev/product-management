import { createAction, props } from '@ngrx/store';

// Login Actions
export const login = createAction('[Auth] Login', props<{ credentials: { email: string; password: string } }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string; user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

// Signup Actions
export const signup = createAction('[Auth] Signup', props<{ data: { email: string; password: string; confirmPassword: string; name: string } }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ token: string; user: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

// Forgot Password Actions
export const forgotPassword = createAction('[Auth] Forgot Password', props<{ email: string }>());
export const forgotPasswordSuccess = createAction('[Auth] Forgot Password Success', props<{ message: string }>());
export const forgotPasswordFailure = createAction('[Auth] Forgot Password Failure', props<{ error: any }>());

// Reset Password Actions
export const resetPassword = createAction('[Auth] Reset Password', props<{ data: { token: string; password: string; confirmPassword: string } }>());
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success', props<{ message: string }>());
export const resetPasswordFailure = createAction('[Auth] Reset Password Failure', props<{ error: any }>());

// Logout Action
export const logout = createAction('[Auth] Logout');