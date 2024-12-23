import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Inject the current `AuthService` and use it to get an authentication token
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.authToken;

  if (!authToken) {
    return next(req);
  }
  // Clone the request to add the authentication header
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(newReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // If the status code is 401 (Unauthorized), logout the user and redirect to login
        authService.logout();
        router.navigate(['/login']);
      }
      return of(error);
    })
  );
}
