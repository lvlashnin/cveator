import { Routes } from '@angular/router';
import { ResumeBuilder } from './features/resume-builder/resume-builder';
import { Home } from './features/home/home';
import { Settings } from './features/home/components/settings/settings';
import { ResumeDashboard } from './features/home/components/resume-dashboard/resume-dashboard/resume-dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', component: ResumeDashboard, canActivate: [authGuard] },
      { path: 'settings', component: Settings, canActivate: [authGuard] },
      { path: 'history', component: History, canActivate: [authGuard] },
    ],
  },
  { path: 'builder/:id', component: ResumeBuilder, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },
];
