import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { CompanyService } from '../../../core/services/company.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  company!: User;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (err) => {
        console.error('Errore caricamento profilo:', err);
      },
    });
  }

  deleteProfile() {
    const confirmDelete = confirm(
      'Sei sicuro di voler eliminare il profilo? Tutti gli annunci vostri verrano eliminati di conseguenza.'
    );

    if (!confirmDelete) return;

    this.companyService.deleteMe().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Errore eliminazione profilo:', err);
        alert('Errore durante l’eliminazione del profilo');
      },
    });
  }
}