import { Routes } from '@angular/router';
import { ResumeBuilder as ResumeBuilderComponent } from './features/resume-builder/resume-builder';
import { Home as HomeComponent } from './features/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'builder', component: ResumeBuilderComponent },
  { path: '**', redirectTo: '' },
];
