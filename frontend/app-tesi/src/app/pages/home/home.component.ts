import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public authService: AuthService) {}

  get companyRoute(): string {
    if (!this.authService.isAuthenticated()) {
      return '/auth/register';
    }

    if (this.authService.isCompany()) {
      return '/company/dashboard';
    }

    if (this.authService.isAdmin()) {
      return '/admin';
    }

    return '/auth/register';
  }

  get companyButtonLabel(): string {
    if (!this.authService.isAuthenticated()) {
      return 'Registra Azienda';
    }

    if (this.authService.isCompany()) {
      return 'Vai alla Dashboard';
    }

    if (this.authService.isAdmin()) {
      return 'Vai al Pannello Admin';
    }

    return 'Registra Azienda';
  }
}
