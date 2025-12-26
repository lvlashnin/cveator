import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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
  navLinks = [
    {
      routerLink: '/',
      icon: 'dashboard',
      title: 'Home',
      activated: false,
    },
    {
      routerLink: '/',
      icon: 'work_history',
      title: 'History',
      activated: false,
    },
    {
      routerLink: '/',
      icon: 'settings',
      title: 'Settings',
      activated: false,
    },
  ];
}
