import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { CompanyService } from '../../core/services/company.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  jobs: Job[] = [];
  companies: User[] = [];

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.error('Errore caricamento jobs:', err);
      }
    });

    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => {
        console.error('Errore caricamento aziende:', err);
      }
    });
  }

  deleteJob(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questo annuncio?')) return;

    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.error('Errore eliminazione:', err);
        alert('Errore durante l’eliminazione');
      }
    });
  }

  deleteCompany(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questa azienda?')) return;

    this.companyService.deleteCompany(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.error('Errore eliminazione azienda:', err);
      }
    });
  }
}
