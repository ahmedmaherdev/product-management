import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URIS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private authExpiryKey = 'authExpiry';
  private userNameKey = 'username'; // Key for storing user name in localStorage

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  private userNameSubject = new BehaviorSubject<string>(this.getStoredUserName()); // BehaviorSubject for user name

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userName$ = this.userNameSubject.asObservable(); // Observable for user name

  constructor(private http: HttpClient) {}

  get authToken() {
    return localStorage.getItem(this.authTokenKey) || '';
  }

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(API_URIS.AUTH.LOGIN, credentials).pipe(
      tap((response: any) => {
        this.addUserAuth(response.user, response.token);
      })
    );
  }

  // Signup method
  signup(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(API_URIS.AUTH.SIGNUP, data).pipe(
      tap((response: any) => {
        this.addUserAuth(response.user, response.token);
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authExpiryKey);
    localStorage.removeItem(this.userNameKey); // Clear stored user name
    this.isAuthenticatedSubject.next(false);
    this.userNameSubject.next(''); // Clear user name
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.checkAuthStatus();
  }

  // Helper: Store the authentication token
  private storeAuthToken(token: string): void {
    const expiryTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.authExpiryKey, expiryTime.toString());
  }

  // Helper: Store the user's name
  private storeUserName(name: string): void {
    localStorage.setItem(this.userNameKey, name);
  }

  // Helper: Get stored user name
  private getStoredUserName(): string {
    return localStorage.getItem(this.userNameKey) || 'Guest';
  }

  // Helper: Check authentication status
  private checkAuthStatus(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    const expiry = localStorage.getItem(this.authExpiryKey);

    if (token && expiry) {
      const isExpired = new Date().getTime() > parseInt(expiry, 10);
      if (!isExpired) {
        return true;
      }
      this.logout(); // Token is expired; clear it.
    }

    return false;
  }

  private addUserAuth(user: any, token: string) {
      const username = user?.name || 'Guest';
      this.storeAuthToken(token);
      this.storeUserName(username); // Store user name
      this.isAuthenticatedSubject.next(true);
      this.userNameSubject.next(username); // Emit updated user name
  }
}
