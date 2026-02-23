import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { roleGuard } from './core/guards/role.guard';

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
        path: 'jobs/:id',
        loadComponent: () =>
          import('./pages/job-detail/job-detail.component').then(
            (m) => m.JobDetailComponent,
          ),
      },

      {
        path: 'create-job',
        loadComponent: () =>
          import('./pages/create-job/create-job.component').then(
            (m) => m.CreateJobComponent,
          ),
        canActivate: [roleGuard],
        data: { role: 'COMPANY' },
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },

      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [roleGuard],
        data: { role: 'ADMIN' },
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        canActivate: [roleGuard],
        data: { role: 'COMPANY' },
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
