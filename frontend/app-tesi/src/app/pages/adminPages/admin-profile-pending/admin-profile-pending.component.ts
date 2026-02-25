import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-profile-pending',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './admin-profile-pending.component.html',
  styleUrl: './admin-profile-pending.component.css',
})
export class AdminProfilePendingComponent implements OnInit {
  companies: User[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter(
          (c) => c.profileUpdatePending === true,
        );
      },
    });
  }

  approveProfile(id: string) {
    this.companyService.approveProfile(id).subscribe({
      next: () => this.loadPending(),
    });
  }

  rejectProfile(id: string) {
    this.companyService.rejectProfile(id).subscribe({
      next: () => this.loadPending(),
    });
  }
}