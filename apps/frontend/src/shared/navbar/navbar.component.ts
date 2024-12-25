import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../store/auth/auth.actions'; // Import your auth actions
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  username$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {
    this.username$ = this.store.select((state: any) => state?.auth?.user?.name);
    this.isAuthenticated$ = this.store.select(
      (state: any) => state?.auth?.isAuthenticated
    );
  }

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
