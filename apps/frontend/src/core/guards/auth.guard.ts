import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.reducer';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate() {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        console.log(authState);
        if (authState.isAuthenticated) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
