import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { CompanyService } from '../../../core/services/company.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-create-job',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
})
export class CreateJobComponent implements OnInit {
  jobForm: FormGroup;
  company!: User;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private companyService: CompanyService,
    private router: Router,
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.companyService.getMe().subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (err) => {
        console.error('Errore caricamento azienda', err);
      },
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Errore creazione job:', err);
      },
    });
  }
}
