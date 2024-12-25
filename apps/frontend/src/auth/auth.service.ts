import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';  // Import Store
import * as AuthActions from '../store/auth/auth.actions';  // Import actions
import { API_URIS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private authExpiryKey = 'authExpiry';
  private userKey = 'authUser';

  constructor(private http: HttpClient, private store: Store) {}

  // Login Method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(API_URIS.AUTH.LOGIN, credentials).pipe(
      take(1),
      tap((response: any) => {
        this.storeAuthData(response.token, response.user);
      })
    );
  }

  // Signup Method
  signup(data: { email: string; password: string; confirmPassword: string; name: string }): Observable<any> {
    return this.http.post(API_URIS.AUTH.SIGNUP, data).pipe(
      take(1),
      tap((response: any) => {
        this.storeAuthData(response.token, response.user);
      })
    );
  }

  // Logout Method
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authExpiryKey);
    localStorage.removeItem(this.userKey);
  }

  // Check Authentication Status
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    const expiry = localStorage.getItem(this.authExpiryKey);

    if (token && expiry) {
      const isExpired = new Date().getTime() > parseInt(expiry, 10);
      if (!isExpired) {
        return true;
      }
      this.store.dispatch(AuthActions.logout());
    }
    return false;
  }

  // Get Current User
  getCurrentUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Get Auth Token
  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey) || '';
  }

  // Helper: Store Authentication Data
  private storeAuthData(token: string, user: any): void {
    const expiryTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.authExpiryKey, expiryTime.toString());
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
