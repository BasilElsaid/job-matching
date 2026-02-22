import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { CompanyService } from '../../core/services/company.service';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  jobs: Job[] = [];
  companies: any[] = [];

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });

    this.companies = this.companyService.getCompanies();
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id);
    this.loadData();
  }

  deleteCompany() {
    this.companyService.deleteCompany();
    this.loadData();
  }
}
