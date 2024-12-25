import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from '../store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideRouter(appRoutes), 
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(AuthEffects),
    provideState({ name: 'auth', reducer: authReducer }),
  ],
};
