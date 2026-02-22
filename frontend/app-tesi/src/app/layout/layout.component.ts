import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  login() {
    this.authService.login();
  }
}
