import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  successMessage$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        token: ['', [Validators.required]], // Hidden field for token
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );

    this.successMessage$ = this.store.pipe(
      select((state: any) => state.auth?.resetPasswordMessage)
    );
    this.error$ = this.store.pipe(
      select((state: any) => state.auth?.error?.error?.message)
    );
  }

  ngOnInit(): void {
    // Extract the token from query parameters and set it in the form
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.resetPasswordForm.patchValue({ token });
    } else {
      console.error('Reset token not found in the URL');
      this.router.navigate(['/login']); // Redirect to login if no token is found
    }
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const { token, password, confirmPassword } = this.resetPasswordForm.value;
    this.store.dispatch(
      AuthActions.resetPassword({ data: { token, password, confirmPassword } })
    );
  }
}
