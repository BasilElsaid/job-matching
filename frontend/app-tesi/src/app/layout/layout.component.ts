import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  open = false;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  get isAdmin() {
  return this.authService.role;
  }

  get isAuth() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
