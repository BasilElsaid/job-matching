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
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },

      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [roleGuard],
        data: { role: 'admin' },
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent,
          ),
        canActivate: [roleGuard],
        data: { role: 'company' },
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
