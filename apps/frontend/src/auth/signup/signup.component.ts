import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions'; // Import actions
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  serverError: string | null = null;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
    this.error$ = this.store.pipe(
      select((state: any) => {
        return state?.auth?.error?.error?.message;
      })
    );
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    // Dispatch the signup action to NgRx store
    this.store.dispatch(AuthActions.signup({ data: this.signupForm.value }));
  }
}
