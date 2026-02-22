import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgIf, NgStyle } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-job-detail',
  imports: [MatCardModule, MatButtonModule, NgIf, DatePipe, NgStyle, MatDividerModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent implements OnInit {
  job?: Job;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.loading = false;
        return;
      }

      this.jobService.getJobById(id).subscribe({
        next: (data) => {
          this.job = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore caricamento job:', err);
          this.loading = false;
        },
      });
    });
  }
}
