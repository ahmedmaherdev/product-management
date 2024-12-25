import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.successMessage$ = this.store.pipe(
      select((state: any) => state?.auth?.forgotPasswordMessage)
    );
    this.error$ = this.store.pipe(
      select((state: any) => state?.auth?.error?.error?.message)
    );
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    this.store.dispatch(AuthActions.forgotPassword({ email }));
  }
}
