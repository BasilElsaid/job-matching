import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-admin-companies',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-companies.component.html',
  styleUrl: './admin-companies.component.css',
})
export class AdminCompaniesComponent implements OnInit {
  companies: User[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
    });
  }

  deleteCompany(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questa azienda?')) return;

    this.companyService.deleteCompany(id).subscribe({
      next: () => this.loadCompanies(),
    });
  }
}