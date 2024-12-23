import { Route } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductsComponent } from '../products/products.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect without AuthGuard
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] }, // AuthGuard is here
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '/login' }, // Redirect unknown routes to login
];
