import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response: any) =>
            AuthActions.loginSuccess({ token: response.token, user: response.user })
          ),
          catchError((error) => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  // Login Success Effect
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, user }) => {
          console.log('Login successful:', token, user);
          this.router.navigate(['/products']).catch((err) =>
            console.error('Navigation to /products failed:', err)
          );
        })
      ),
    { dispatch: false }
  );

  // Signup Effect
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ data }) =>
        this.authService.signup(data).pipe(
          map((response: any) =>
            AuthActions.signupSuccess({ token: response.token, user: response.user })
          ),
          catchError((error) => {
            console.error('Signup error:', error);
            return of(AuthActions.signupFailure({ error }));
          })
        )
      )
    )
  );

  // Signup Success Effect
  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ token, user }) => {
          console.log('Signup successful:', token, user);
          this.router.navigate(['/products']).catch((err) =>
            console.error('Navigation to /products failed:', err)
          );
        })
      ),
    { dispatch: false }
  );

  // Logout Effect
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          console.log('Logging out...');
          this.authService.logout();
          this.router.navigate(['/login']).catch((err) =>
            console.error('Navigation to /login failed:', err)
          );
        })
      ),
    { dispatch: false }
  );

  // Handle Login Failure Effect
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          console.error('Login failed:', error);
          // Optionally, show a notification or redirect to an error page
        })
      ),
    { dispatch: false }
  );

  // Handle Signup Failure Effect
  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap(({ error }) => {
          console.error('Signup failed:', error);
          // Optionally, show a notification or redirect to an error page
        })
      ),
    { dispatch: false }
  );
}
