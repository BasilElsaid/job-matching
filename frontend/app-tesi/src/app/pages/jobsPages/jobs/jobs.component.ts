import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Job } from '../../../core/models/job.model';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-jobs',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgFor,
    NgIf,
    RouterModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  loading = true;

  constructor(
    private jobService: JobService,
  ) {}

  ngOnInit() {
    console.log('🟢 COMPONENTE CARICATO');

    this.jobService.getJobs().subscribe({
      next: (res: any) => {
        console.log('🔥 JOBS:', res);

        this.jobs = res; // ✅ SALVIAMO I DATI
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ ERRORE:', err);
        this.loading = false;
      },
    });
  }
}
