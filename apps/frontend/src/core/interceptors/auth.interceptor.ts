import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.reducer';
import * as AuthActions from '../../store/auth/auth.actions'; // Import actions

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Inject the current `AuthService` and use it to get an authentication token
  const store = inject(Store<{ auth: AuthState }>);

  return store.select('auth').pipe(
    take(1),
    map((authState) => authState.token),
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(req).pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            // If the token is invalid, log the user out and navigate to the login page
            store.dispatch(AuthActions.logout());
          }
          return of(error);
        })
      );
    })
  );
}
