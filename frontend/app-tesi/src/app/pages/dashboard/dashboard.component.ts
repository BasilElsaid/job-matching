import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';

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
  company = {
    name: 'Nome Azienda',
    email: 'company@email.com',
    phone: '+39 333 1234567',
    address: 'Via Roma 1',
    description: 'Company description',
  };

  myJobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadMyJobs();
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
}
