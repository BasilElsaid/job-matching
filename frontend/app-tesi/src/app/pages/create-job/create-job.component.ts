import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-create-job',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
})
export class CreateJobComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router,
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)],
      ],
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => {
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        console.error('Errore creazione job:', err);
      },
    });
  }
}
