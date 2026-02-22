import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, NgFor, RouterModule],
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
    this.jobService.getJobs().subscribe((jobs) => {
      // 🔥 FILTRIAMO PER AZIENDA (temporaneo)
      this.myJobs = jobs.filter((job) => job.company === this.company.name);
    });
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id);
    this.loadMyJobs();
  }

  editJob(job: Job) {
    console.log('Edit job:', job);
  }
}
