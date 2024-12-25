import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.reducer';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Inject the current `AuthService` and use it to get an authentication token
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store<{ auth: AuthState }>);

  return store.select('auth').pipe(
    take(1),
    map((authState) => authState.token),
    switchMap((token) => {
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
      return next(req);
    })
  );
}
