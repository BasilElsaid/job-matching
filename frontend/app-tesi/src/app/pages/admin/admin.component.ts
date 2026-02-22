import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id);
    this.loadJobs();
  }

  approveJob(id: number) {
    console.log('Approve job', id);
  }
}
