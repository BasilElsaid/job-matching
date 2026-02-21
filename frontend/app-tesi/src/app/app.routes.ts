import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },

      {
        path: 'jobs',
        loadComponent: () =>
          import('./pages/jobs/jobs.component').then((m) => m.JobsComponent),
      },

      {
        path: 'auth',
        loadComponent: () =>
          import('./pages/auth/auth.component').then((m) => m.AuthComponent),
      },

      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      },

      {
        path: 'companies',
        loadComponent: () =>
          import('./pages/companies/companies.component').then(
            (m) => m.CompaniesComponent,
          ),
      },

      {
        path: 'students',
        loadComponent: () =>
          import('./pages/students/students.component').then(
            (m) => m.StudentsComponent,
          ),
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
