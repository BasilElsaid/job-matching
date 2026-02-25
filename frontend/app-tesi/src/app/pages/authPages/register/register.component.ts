import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.fb.group(
      {
        // ACCOUNT
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
          ],
        ],
        confirmPassword: ['', Validators.required],

        // COMPANY DATA
        companyName: ['', Validators.required],
        companyEmail: ['', [Validators.required, Validators.email]],
        companyPhone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)],
        ],
        address: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;

    // Rimuoviamo confirmPassword prima di inviare al backend
    delete formData.confirmPassword;

    // Impostiamo il ruolo automaticamente come COMPANY
    formData.role = 'COMPANY';

    this.authService.register(formData).subscribe({
      next: (res) => {
        console.log('✅ Utente registrato:', res);

        // Dopo registrazione → facciamo login automatico
        this.authService.login(res);

        // Redirect dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Errore registrazione:', err);
      },
    });
  }
}
