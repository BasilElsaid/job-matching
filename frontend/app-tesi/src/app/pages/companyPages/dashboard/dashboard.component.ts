import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { User } from '../../../core/models/user.model';
import { Job, JobStatus } from '../../../core/models/job.model';
import { CompanyService } from '../../../core/services/company.service';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatDivider,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  company!: User;
  myJobs: Job[] = [];
  statusMap: Record<JobStatus, string> = {
    PENDING: 'In Attesa',
    APPROVED: 'Approvato',
  };

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
  ) {}

  ngOnInit() {
    this.loadCompany();
    this.loadMyJobs();
  }

  loadCompany() {
    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (err) => {
        console.error('Errore caricamento azienda:', err);
      },
    });
  }

  loadMyJobs() {
    this.jobService.getMyJobs().subscribe({
      next: (jobs) => {
        this.myJobs = jobs;
      },
      error: (err) => {
        console.error('Errore caricamento annunci:', err);
      },
    });
  }

  deleteJob(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questo annuncio?')) return;

    this.jobService.deleteJob(id).subscribe({
      next: () => {
        this.loadMyJobs();
      },
      error: (err) => {
        console.error('Errore eliminazione:', err);
        alert('Errore durante l’eliminazione');
      },
    });
  }

  isExpired(date: Date | string): boolean {
    if (!date) return false;

    return new Date(date).getTime() < new Date().getTime();
  }

  renewJob(jobId: string) {
    this.jobService.renewJob(jobId).subscribe({
      next: () => {
        alert('Annuncio rinnovato per altri 30 giorni');
        this.loadMyJobs();
      },
      error: (err) => {
        console.error(err);
        alert('Errore nel rinnovo');
      },
    });
  }
}
