import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store'; // Import Store
import { Router, RouterModule } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions'; // Import actions
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store, // Inject Store
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.error$ = this.store.pipe(select((state: any) => {
      return state?.auth?.error?.error?.message;
    }));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ credentials: { email, password } }));
  }
}
