import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private mockJobs: Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Milano',
      type: 'Full-time',
      description: 'Angular developer with 2+ years experience.',
      createdAt: new Date(),
      companyEmail: 'hr@techsolutions.com',
      companyPhone: '+39 333 1234567',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Innovatech',
      location: 'Roma',
      type: 'Remote',
      description: 'Spring Boot REST API developer.',
      createdAt: new Date(),
      companyEmail: 'jobs@innovatech.it',
      companyPhone: '+39 06 9876543',
    },
  ];

  getJobs(): Observable<Job[]> {
    // 🔥 Simulazione chiamata HTTP
    return of(this.mockJobs).pipe(delay(800));
  }

  getJobById(id: number): Observable<Job | undefined> {
    const job = this.mockJobs.find((j) => j.id === id);
    return of(job).pipe(delay(500));
  }

  createJob(job: any) {
    this.mockJobs.push(job);
  }

  deleteJob(id: number) {
    this.mockJobs = this.mockJobs.filter((job) => job.id !== id);
  }
}
