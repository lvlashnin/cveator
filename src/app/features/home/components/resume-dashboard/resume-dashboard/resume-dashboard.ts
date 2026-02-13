import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../../../../../core/services/resume';
import { Router } from '@angular/router';
import { Resume } from '../../../../../core/interfaces/models';
import { MatCardModule } from '@angular/material/card';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

@Component({
  selector: 'app-resume-dashboard',
  imports: [CommonModule, MatButtonModule, MatIconModule, DatePipe, MatCardModule],
  templateUrl: './resume-dashboard.html',
  styleUrl: './resume-dashboard.scss',
})
export class ResumeDashboard implements OnInit {
  private resumeService = inject(ResumeService);
  private router = inject(Router);

  public resumes = signal<Resume[]>([]);

  ngOnInit(): void {
    this.loadResumes();
  }

  private loadResumes(): void {
    this.resumeService.getAllResumes().subscribe({
      next: (data) => {
        this.resumes.set(data);
      },
      error: (err) => console.error('Error loading resumes', err),
    });
  }

  public createNewResume(): void {
    this.resumeService.createResume().subscribe({
      next: (newResume) => {
        this.router.navigate(['/builder', newResume.id]);
      },
    });
  }

  public openResume(id: number): void {
    this.router.navigate(['/builder', id]);
  }

  public deleteResume(id: number): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResumeById(id).subscribe({
        next: () => {
          this.loadResumes();
        },
        error: (err) => console.error('Error deleting resume', err),
      });
    }
  }
}
