import { Routes } from '@angular/router';
import { ResumeBuilder } from './features/resume-builder/resume-builder';
import { Home } from './features/home/home';
import { Settings } from './features/home/components/settings/settings';
import { ResumeDashboard } from './features/home/components/resume-dashboard/resume-dashboard/resume-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', component: ResumeDashboard },
      { path: 'settings', component: Settings },
      { path: 'history', component: History },
    ],
  },
  { path: 'builder/:id', component: ResumeBuilder },
  { path: '**', redirectTo: '' },
];
