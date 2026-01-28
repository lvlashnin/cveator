import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../core/services/resume';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private resumeService = inject(ResumeService);
  private router = inject(Router);

  public currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  public createNewResume(): void {
    const userId = 1;
    this.resumeService.createResume(userId).subscribe({
      next: (newResume) => {
        this.router.navigate(['/builder', newResume.id]);
      },
    });
  }
  public navLinks = [
    {
      routerLink: '/',
      icon: 'dashboard',
      title: 'Home',
      activated: false,
    },
    {
      routerLink: '/history',
      icon: 'work_history',
      title: 'History',
      activated: false,
    },
    {
      routerLink: '/settings',
      icon: 'settings',
      title: 'Settings',
      activated: false,
    },
  ];
}
