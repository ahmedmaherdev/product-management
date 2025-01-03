import { Route } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductsComponent } from '../products/products.component';
import { ForgotPasswordComponent } from '../auth/forget-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/login' },
];
